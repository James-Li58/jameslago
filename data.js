/* ============================================================
   data.js ── 網站基本資料（名稱、自我介紹、五個社群平台）
   ------------------------------------------------------------
   ★ 要改的地方只有下面 SITE 這一段 ★
   ------------------------------------------------------------
   樂高作品清單不在這個檔案，而是 works.js，
   由 build-works.bat 自動掃描 images 資料夾產生，
   所以重新掃描照片不會蓋掉你在這裡填的帳號資料。

   【目前狀態】
   ✅ YouTube   @chihchiehli6821  已確認網址可開啟
   ✅ Instagram chihchiehli       已確認網址可開啟
   ✅ Threads   @chihchiehli      已確認網址可開啟
   ✅ TikTok    @chihchieh.li     已由你確認
   ⏳ Facebook  Chihchieh Li      還缺粉絲頁網址，補上 url 即可自動生效
   ============================================================ */

const SITE = {
  siteName: "積木作品集",
  author: "Chihchieh Li",                 // ← 想改中文名字直接改這裡
  tagline: "把零件堆成自己的世界",
  intro: "這裡收錄我多年來的樂高創作，每一件都是從零件堆裡慢慢長出來的。新作品會同步發佈到 YouTube、Instagram、TikTok、Threads 與 Facebook，歡迎追蹤收看組裝過程與創作幕後。",
  email: "YOUR_EMAIL@example.com",        // ← 還需要你的聯絡信箱
  location: "台灣",

  /* ★★ 五個社群平台 ★★
     handle 是顯示在網站上的帳號文字
     url    是點下去要前往的網址（留空的話，網站會顯示「網址待補」而不會連到錯誤頁面） */
  social: {
    youtube:   { label: "YouTube",   handle: "@chihchiehli6821", url: "https://www.youtube.com/@chihchiehli6821" },
    instagram: { label: "Instagram", handle: "@chihchiehli",     url: "https://www.instagram.com/chihchiehli/" },
    tiktok:    { label: "TikTok",    handle: "@chihchieh.li",    url: "https://www.tiktok.com/@chihchieh.li" },
    threads:   { label: "Threads",   handle: "@chihchiehli",     url: "https://www.threads.net/@chihchiehli" },
    facebook:  { label: "Facebook",  handle: "Chihchieh Li",     url: "" }
  }
};

/* ============================================================
   插畫區（目前已停用）
   ------------------------------------------------------------
   這次的網站以樂高作品為主，插畫頁面已從選單移除。
   若之後想恢復插畫區，只要三步：
     1. 把 optional/art.html 複製到網站最上層（與 index.html 同層）
     2. 把下面 ART_WORKS 換成你的插畫資料（格式跟 works.js 一樣）
     3. 在每個頁面的 <nav class="site-nav"> 裡加回
        <a href="art.html">插畫作品</a>
   ============================================================ */
const ART_WORKS = [];
