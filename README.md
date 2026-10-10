# 積木作品集｜個人樂高網站

一個純靜態的個人樂高作品網站，不需要資料庫、不需要後端，只要有瀏覽器就能打開。
作品清單由你的照片資料夾自動產生，並在五個平台同步發佈：**YouTube、Instagram、TikTok、Threads、Facebook**。

> 插畫區已先移除（這次以樂高作品為主）。想恢復的話，`optional/art.html` 裡有三步說明。

---

## 一、檔案結構

```
積木作品集/
├─ index.html            首頁（精選作品 + 五個平台追蹤 + 更新教學）
├─ lego.html             樂高作品頁（分類篩選 + 照片燈箱）
├─ about.html            關於我
├─ contact.html          聯絡我
├─ build-works.bat       ★ 雙擊這個，自動掃描照片並更新網站 ★
├─ build-works.ps1       掃描程式本體（由 .bat 呼叫）
├─ images/               ★ 把作品照片放這裡 ★
│   └─ 放照片在這裡.txt
├─ optional/art.html     插畫頁（選用，預設未啟用）
└─ assets/
    ├─ css/style.css     全站樣式（改顏色看最上面的 :root）
    ├─ js/data.js        ★ 網站名稱、自我介紹、五個社群帳號 ★
    ├─ js/works.js       作品清單（由 build-works.bat 自動產生）
    └─ js/main.js        網站邏輯（不用改）
```

---

## 二、把 D 槽的照片搬進來（最重要的第一步）

你的照片放在電腦的 `D:\Lego作品`，網站程式**讀不到 D 槽**，所以要用複製的方式放進來：

1. 打開「本機」→ 進入 **D 槽** → 找到 **Lego作品** 資料夾
2. 在 `Lego作品` 上按 **右鍵 → 複製**（或按 Ctrl + C）
3. 進入網站的 `images` 資料夾，按 **右鍵 → 貼上**（或按 Ctrl + V）
4. 回到網站最上層資料夾，**雙擊 `build-works.bat`**
5. 黑色視窗會顯示「掃描完成：N 件作品，共 M 張照片」
6. 雙擊 `index.html`，或重新整理瀏覽器 → 作品就出現了

之後只要新增作品，重複「放進 images → 雙擊 build-works.bat → 重新整理」就好。

### 資料夾要怎麼排

| 排法 | 結果 |
|---|---|
| `images\城市天際線\01-封面.jpg` | 一件作品，名稱「城市天際線」，分類「未分類」 |
| `images\建築\城市天際線\01-封面.jpg` | 一件作品，名稱「城市天際線」，分類自動是「建築」 |
| 直接丟 `images\照片.jpg` | 全部歸成一件叫「未分類作品」的作品 |

- **資料夾名稱 = 作品名稱**，改成你要的名字就會直接反映在網站上。
- **檔名開頭的數字決定順序**，數字最小的那張會當封面：`01-封面.jpg`、`02-側面.jpg`、`03-細節.jpg`。
- 一件作品可以放很多張照片，燈箱裡會自動出現縮圖可以切換。
- 支援 jpg、jpeg、png、webp、gif、bmp、tif。
- 分類篩選按鈕會**自動**依你的作品產生，不用自己維護。

---

## 三、改成你自己的資料（`assets/js/data.js`）

### 1. 五個社群帳號（一定要改）

```js
social: {
  youtube:   { label: "YouTube",   handle: "@你的帳號", url: "https://www.youtube.com/@你的帳號" },
  instagram: { label: "Instagram", handle: "@你的帳號", url: "https://www.instagram.com/你的帳號/" },
  tiktok:    { label: "TikTok",    handle: "@你的帳號", url: "https://www.tiktok.com/@你的帳號" },
  threads:   { label: "Threads",   handle: "@你的帳號", url: "https://www.threads.net/@你的帳號" },
  facebook:  { label: "Facebook",  handle: "你的粉絲頁名稱", url: "https://www.facebook.com/你的粉絲頁名稱" }
}
```

`handle` 是顯示在網站上的文字，`url` 是點下去要前往的網址，兩個都要填。
目前是範例值 `YOUR_HANDLE`，填一次就會同步套用到**首頁、頁尾、樂高作品頁、關於我、聯絡我**全部位置。

### 2. 網站名稱與自我介紹

同一個檔案上面的 `siteName`（網站名稱）、`author`（你的名字）、`intro`（自我介紹）、`email`（信箱）、`location`（所在地）。

---

## 四、每件作品的社群貼文連結（選用）

`assets/js/works.js` 裡每件作品都有 `links` 欄位：

```js
links: { youtube: "", instagram: "", tiktok: "", threads: "", facebook: "" }
```

貼上該件作品在該平台的貼文網址，燈箱裡就會出現對應的按鈕；留空則顯示「這件作品的社群貼文連結還沒填」。

> 注意：`works.js` 是自動產生的，重新執行 `build-works.bat` 時，`desc`（說明）與 `links` 會**盡量保留**（依作品名稱比對），但 `year`、`tags` 會重置。最保險的做法是**作品都放好、掃描完之後再填連結**。

想改作品說明：直接編輯 `works.js` 的 `desc` 欄位，重新掃描時會保留。

---

## 五、怎麼放到網路上

**最快：Netlify Drop**
1. 打開 <https://app.netlify.com/drop>
2. 把整個網站資料夾拖進去
3. 幾秒後得到公開網址，可在 Site settings 綁自己的網域

**GitHub Pages**
1. 在 GitHub 建立新的 repository
2. 上傳網站內所有檔案（`index.html` 要在最上層）
3. Settings → Pages → Source 選 `Deploy from a branch`，Branch 選 `main` / `root`
4. 等一兩分鐘，網址是 `https://你的帳號.github.io/repo名稱/`

> 上傳到網路時，記得 `images` 資料夾（含所有照片）也要一起上傳，否則網站會顯示「尚未放入作品照片」的佔位圖。

---

## 六、想恢復插畫區

1. 把 `optional/art.html` 複製到網站最上層（與 `index.html` 同層）
2. 編輯 `assets/js/data.js` 最下面的 `ART_WORKS`，填入插畫資料（格式與 `works.js` 相同）
3. 在每個頁面的 `<nav class="site-nav">` 裡加回 `<a href="art.html">插畫作品</a>`

---

## 七、小提醒

- 本站使用自繪的簡化社群圖示，未使用各平台官方商標；頁尾也註明「與 LEGO® 官方無關」，避免商標混淆。
- 照片著作權屬於你，頁尾已標示版權所有。
- 想加流量統計可接 Google Analytics；想加聯絡表單可接 Formspree（純前端服務，不需要自己寫後端）。
- 照片建議先縮到長邊 1600px、壓縮到 300KB 以內，載入會快很多。
