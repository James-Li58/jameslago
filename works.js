/* ============================================================
   works.js ── 樂高作品清單（目前是示範內容）
   ------------------------------------------------------------
   ★★ 這個檔案由 build-works.bat 自動產生 ★★
        第一次執行掃描後，下面的示範作品會被你的真實作品取代。

   你不需要手動編輯這個檔案。要更新作品：
     1. 把照片複製到 images 資料夾（一個作品一個子資料夾）
     2. 雙擊 build-works.bat
     3. 重新整理瀏覽器

   下面的 6 件示範作品沒有照片，所以網站會顯示佔位圖，
   用來讓你先看到排版與點圖放大（燈箱）的效果。
   ============================================================ */

const LEGO_WORKS = [
  {
    id: "lego-001",
    title: "示範作品：城市天際線",
    category: "建築",
    year: "",
    color: "#1B6FD4",
    cover: "",
    photos: [],
    featured: true,
    desc: "這是示範卡片。把照片放進 images\\城市天際線\\ 之後執行 build-works.bat，就會換成你真正的作品照片。",
    tags: ["示範"],
    links: { youtube: "", instagram: "", tiktok: "", threads: "", facebook: "" }
  },
  {
    id: "lego-002",
    title: "示範作品：復古咖啡車",
    category: "載具",
    year: "",
    color: "#D6262B",
    cover: "",
    photos: [],
    featured: true,
    desc: "示範卡片。資料夾名稱就是作品名稱，照片檔名開頭的數字決定顯示順序。",
    tags: ["示範"],
    links: { youtube: "", instagram: "", tiktok: "", threads: "", facebook: "" }
  },
  {
    id: "lego-003",
    title: "示範作品：積木恐龍",
    category: "生物與雕塑",
    year: "",
    color: "#2FA84F",
    cover: "",
    photos: [],
    featured: true,
    desc: "示範卡片。一件作品可以放多張照片，燈箱裡會出現縮圖可以切換。",
    tags: ["示範"],
    links: { youtube: "", instagram: "", tiktok: "", threads: "", facebook: "" }
  },
  {
    id: "lego-004",
    title: "示範作品：街角書店",
    category: "建築",
    year: "",
    color: "#E08A1E",
    cover: "",
    photos: [],
    featured: false,
    desc: "示範卡片。分類按鈕會依你的作品自動產生，不需要自己維護。",
    tags: ["示範"],
    links: { youtube: "", instagram: "", tiktok: "", threads: "", facebook: "" }
  },
  {
    id: "lego-005",
    title: "示範作品：太空巡邏艇",
    category: "載具",
    year: "",
    color: "#6B4FBB",
    cover: "",
    photos: [],
    featured: false,
    desc: "示範卡片。每件作品都可以填五個平台的貼文連結。",
    tags: ["示範"],
    links: { youtube: "", instagram: "", tiktok: "", threads: "", facebook: "" }
  },
  {
    id: "lego-006",
    title: "示範作品：花園涼亭",
    category: "場景",
    year: "",
    color: "#1FA5A0",
    cover: "",
    photos: [],
    featured: false,
    desc: "示範卡片。想調整作品說明或社群連結，重新掃描時會自動保留。",
    tags: ["示範"],
    links: { youtube: "", instagram: "", tiktok: "", threads: "", facebook: "" }
  }
];
