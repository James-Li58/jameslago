@echo off
chcp 65001 >nul
cd /d "%~dp0"
echo.
echo  ============================================
echo    積木作品集 - 掃描 images 資料夾
echo  ============================================
echo.
powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0build-works.ps1"
if errorlevel 1 (
  echo.
  echo  [X] 掃描失敗。請確認這台電腦可以執行 PowerShell。
  echo.
  pause
  exit /b 1
)
echo.
echo  完成！打開 index.html 就能看到新作品。
echo.
pause
