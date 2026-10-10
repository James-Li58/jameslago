# ============================================================
#  build-works.ps1 ── 掃描 images 資料夾，自動產生 assets/js/works.js
#  由 build-works.bat 呼叫，不需要手動執行。
# ------------------------------------------------------------
#  規則：
#   images\作品名稱\照片.jpg            → 一件作品，分類「未分類」
#   images\分類\作品名稱\照片.jpg       → 一件作品，並自動分到該分類
#   照片檔名數字最小的那張會當作封面
#   works.js 裡原有的 desc（說明）與 links（社群貼文）會盡量保留
# ============================================================

$ErrorActionPreference = "Stop"
$OutputEncoding = [System.Text.Encoding]::UTF8

$root    = Split-Path -Parent $MyInvocation.MyCommand.Path
$imgDir  = Join-Path $root "images"
$outFile = Join-Path $root "assets\js\works.js"

if (-not (Test-Path $imgDir)) { New-Item -ItemType Directory -Path $imgDir | Out-Null }

$exts    = @(".jpg", ".jpeg", ".png", ".webp", ".gif", ".bmp", ".tif", ".tiff")
$palette = @("#1B6FD4", "#D6262B", "#2FA84F", "#E08A1E", "#6B4FBB", "#1FA5A0", "#C2417F", "#4A5364")

# ---------- 讀取舊的 works.js，保留 desc 與 links ----------
$old = @{}
if (Test-Path $outFile) {
  $txt = Get-Content $outFile -Raw -Encoding UTF8
  foreach ($m in [regex]::Matches($txt, 'title:\s*"(?<t>[^"]*)"(?<body>.*?)(?=title:\s*"|\]\s*;?\s*$)', 'Singleline')) {
    $title = $m.Groups['t'].Value
    $body  = $m.Groups['body'].Value
    $desc  = ''
    $links = ''
    $dm = [regex]::Match($body, 'desc:\s*"(?<d>(?:[^"\\]|\\.)*)"')
    if ($dm.Success) { $desc = $dm.Groups['d'].Value }
    $lm = [regex]::Match($body, 'links:\s*\{(?<l>[^}]*)\}')
    if ($lm.Success) { $links = $lm.Groups['l'].Value.Trim() }
    if ($title -and -not $old.ContainsKey($title)) {
      $old[$title] = [pscustomobject]@{ Desc = $desc; Links = $links }
    }
  }
}

# ---------- 收集作品資料夾 ----------
# Recurse = 這件作品的照片要往下找幾層（作品資料夾用 $true，散圖用 $false）
$works = New-Object System.Collections.ArrayList

foreach ($d in (Get-ChildItem $imgDir -Directory | Sort-Object Name)) {
  $inner = @(Get-ChildItem $d.FullName -Directory | Sort-Object Name)
  if ($inner.Count -gt 0) {
    foreach ($w in $inner) {
      [void]$works.Add([pscustomobject]@{ Title = $w.Name; Cat = $d.Name; Dir = $w.FullName; Recurse = $true })
    }
  } else {
    [void]$works.Add([pscustomobject]@{ Title = $d.Name; Cat = "未分類"; Dir = $d.FullName; Recurse = $true })
  }
}

# 直接丟在 images 底下的散圖，全部歸成一件作品
$loose = @(Get-ChildItem $imgDir -File | Where-Object { $exts -contains $_.Extension.ToLower() } | Sort-Object Name)
if ($loose.Count -gt 0) {
  [void]$works.Add([pscustomobject]@{ Title = "未分類作品"; Cat = "未分類"; Dir = $imgDir; Recurse = $false })
}

# ---------- 產生 works.js ----------
function Esc-Js([string]$s) {
  if ($null -eq $s) { return '' }
  return $s.Replace('\', '\\').Replace('"', '\"').Replace("`r", '').Replace("`n", ' ')
}

$sb = New-Object System.Text.StringBuilder
[void]$sb.AppendLine('/* ============================================================')
[void]$sb.AppendLine('   works.js ── 樂高作品清單')
[void]$sb.AppendLine('   ------------------------------------------------------------')
[void]$sb.AppendLine('   ★ 這個檔案由 build-works.bat 自動產生，請不要手動編輯 ★')
[void]$sb.AppendLine('   ------------------------------------------------------------')
[void]$sb.AppendLine("   產生時間：$(Get-Date -Format 'yyyy-MM-dd HH:mm')")
[void]$sb.AppendLine('   作品名稱 = 資料夾名稱／照片順序 = 檔名開頭的數字')
[void]$sb.AppendLine('   分類 = 上一層資料夾名稱（直接放在 images 底下的作品分類為「未分類」）')
[void]$sb.AppendLine('   ============================================================ */')
[void]$sb.AppendLine('')
[void]$sb.AppendLine('const LEGO_WORKS = [')

$i = 0
$totalPhotos = 0
foreach ($w in $works) {
  if ($w.Recurse) {
    $photos = @(Get-ChildItem $w.Dir -File -Recurse | Where-Object { $exts -contains $_.Extension.ToLower() } | Sort-Object Name)
  } else {
    $photos = @(Get-ChildItem $w.Dir -File | Where-Object { $exts -contains $_.Extension.ToLower() } | Sort-Object Name)
  }
  if ($photos.Count -eq 0) { continue }
  $i++
  $totalPhotos += $photos.Count

  $id    = 'lego-{0:d3}' -f $i
  $color = $palette[($i - 1) % $palette.Count]
  $photoJs = ($photos | ForEach-Object {
      $rel = $_.FullName.Substring($imgDir.Length + 1) -replace '\\', '/'
      '      "images/' + $rel + '"'
    }) -join ",`r`n"

  if ($i -le 3) { $featured = 'true' } else { $featured = 'false' }

  $desc  = ''
  $links = 'youtube: "", instagram: "", tiktok: "", threads: "", facebook: ""'
  if ($old.ContainsKey($w.Title)) {
    $desc = $old[$w.Title].Desc
    if ($old[$w.Title].Links -and $old[$w.Title].Links.Length -gt 0) { $links = $old[$w.Title].Links }
  }

  [void]$sb.AppendLine('  {')
  [void]$sb.AppendLine("    id: `"$id`",")
  [void]$sb.AppendLine("    title: `"$(Esc-Js $w.Title)`",")
  [void]$sb.AppendLine("    category: `"$(Esc-Js $w.Cat)`",")
  [void]$sb.AppendLine('    year: "",')
  [void]$sb.AppendLine("    color: `"$color`",")
  [void]$sb.AppendLine('    cover: "",')
  [void]$sb.AppendLine('    photos: [')
  [void]$sb.AppendLine($photoJs)
  [void]$sb.AppendLine('    ],')
  [void]$sb.AppendLine("    featured: $featured,")
  [void]$sb.AppendLine("    desc: `"$(Esc-Js $desc)`",")
  [void]$sb.AppendLine('    tags: [],')
  [void]$sb.AppendLine("    links: { $links }")
  [void]$sb.AppendLine('  },')
}
[void]$sb.AppendLine('];')
[void]$sb.AppendLine('')

$utf8 = New-Object System.Text.UTF8Encoding($false)
[System.IO.File]::WriteAllText($outFile, $sb.ToString(), $utf8)

Write-Host ""
Write-Host "  掃描完成：$i 件作品，共 $totalPhotos 張照片" -ForegroundColor Green
Write-Host "  已更新：assets\js\works.js" -ForegroundColor Green
if ($i -eq 0) {
  Write-Host ""
  Write-Host "  [i] images 資料夾裡還沒有照片。" -ForegroundColor Yellow
  Write-Host "      請把 D:\Lego作品 底下的作品資料夾複製進 images，再執行一次。" -ForegroundColor Yellow
}
