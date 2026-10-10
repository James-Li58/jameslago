/* ============================================================
   main.js ── 網站互動邏輯（一般不需要修改）
   作品清單在 works.js（由 build-works.bat 自動產生）
   網站基本資料在 data.js
   ============================================================ */

/* ---------- 小工具 ---------- */
const $  = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

function hexToRgb(hex){
  const h = String(hex || '#1B6FD4').replace('#','');
  const v = h.length === 3 ? h.split('').map(c => c + c).join('') : h;
  return [parseInt(v.slice(0,2),16), parseInt(v.slice(2,4),16), parseInt(v.slice(4,6),16)];
}
function mix(a, b, t){
  const A = hexToRgb(a), B = hexToRgb(b);
  const c = A.map((x,i) => Math.round(x + (B[i]-x)*t));
  return '#' + c.map(x => x.toString(16).padStart(2,'0')).join('');
}
function esc(s){
  return String(s == null ? '' : s)
    .replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}

/* ---------- 社群圖示（自繪簡化圖形，非官方商標） ---------- */
const ICONS = {
  youtube: '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><rect x="1.5" y="4.5" width="21" height="15" rx="4.5" fill="currentColor"/><path d="M10 8.6l6 3.4-6 3.4z" fill="#fff"/></svg>',
  instagram: '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><rect x="2.5" y="2.5" width="19" height="19" rx="5.5" stroke="currentColor" stroke-width="2"/><circle cx="12" cy="12" r="4.6" stroke="currentColor" stroke-width="2"/><circle cx="17.6" cy="6.4" r="1.4" fill="currentColor"/></svg>',
  tiktok: '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M13.6 2.6h3c.3 2.1 1.6 3.5 3.7 3.7v3c-1.5 0-2.8-.5-3.8-1.3v6.4a5.9 5.9 0 1 1-5.9-5.9c.3 0 .6 0 .9.1v3.1a2.8 2.8 0 1 0 2 2.7V2.6z" fill="currentColor"/></svg>',
  threads: '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="12" cy="12" r="10.2" stroke="currentColor" stroke-width="2"/><text x="12" y="16.6" text-anchor="middle" font-size="12" font-weight="700" fill="currentColor" font-family="sans-serif">@</text></svg>',
  facebook: '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><rect x="1.5" y="1.5" width="21" height="21" rx="5" fill="currentColor"/><path d="M13.4 22v-7.2h2.5l.4-2.9h-2.9V9.9c0-.8.2-1.4 1.4-1.4h1.6V5.9c-.3 0-1.2-.1-2.3-.1-2.3 0-3.9 1.4-3.9 4v2.1H7.6v2.9h2.6V22h3.2z" fill="#fff"/></svg>',
  link: '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M9.5 14.5l5-5" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><path d="M7 17a4.2 4.2 0 0 1 0-6l2-2M17 7a4.2 4.2 0 0 1 0 6l-2 2" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>'
};
const SOCIAL_COLOR = {
  youtube:'#D6262B', instagram:'#C2417F', tiktok:'#14181F',
  threads:'#14181F', facebook:'#1877F2'
};

/* ---------- 作品清單（防呆：works.js 沒載入也能跑） ---------- */
const WORKS = (typeof LEGO_WORKS !== 'undefined' && Array.isArray(LEGO_WORKS)) ? LEGO_WORKS : [];
const ARTS  = (typeof ART_WORKS  !== 'undefined' && Array.isArray(ART_WORKS))  ? ART_WORKS  : [];

/* ---------- 佔位圖（還沒放照片時自動產生） ---------- */
function placeholder(work){
  const base  = work.color || '#1B6FD4';
  const light = mix(base, '#ffffff', 0.26);
  const dark  = mix(base, '#000000', 0.22);
  const isLego = String(work.id || '').indexOf('lego') === 0;
  let art = '';

  if (isLego){
    const pal = [base, light, dark, light];
    const bw = 150, bh = 112;
    for (let r = 0; r < 4; r++){
      const offset = (r % 2) ? -bw/2 : 0;
      for (let c = -1; c <= 4; c++){
        const x = offset + c*bw + 4, y = r*bh + 4;
        const fill = pal[(r + c + 4) % pal.length];
        art += `<rect x="${x}" y="${y}" width="${bw-8}" height="${bh-8}" rx="9" fill="${fill}"/>`;
        for (let k = 0; k < 2; k++){
          const cx = x + (bw-8)*(k+1)/3;
          art += `<circle cx="${cx}" cy="${y+19}" r="13" fill="${light}" opacity=".55"/>`;
        }
      }
    }
  } else {
    art += `<defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="${light}"/><stop offset="1" stop-color="${dark}"/></linearGradient></defs>
      <rect width="600" height="450" fill="url(#g)"/>`;
    art += `<circle cx="180" cy="170" r="96" fill="${base}" opacity=".55"/>`;
    art += `<circle cx="400" cy="250" r="128" fill="${light}" opacity=".45"/>`;
    art += `<circle cx="300" cy="360" r="80" fill="${dark}" opacity=".40"/>`;
    art += `<path d="M60 330 C160 250 240 400 350 320 S520 250 560 300" stroke="#ffffff" stroke-width="9" fill="none" opacity=".45" stroke-linecap="round"/>`;
  }

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 450" width="600" height="450">
    ${art}
    <rect x="0" y="384" width="600" height="66" fill="rgba(20,24,31,.72)"/>
    <text x="300" y="424" text-anchor="middle" font-family="sans-serif" font-size="21" fill="#ffffff">尚未放入作品照片</text>
  </svg>`;
  return 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg);
}

/* ---------- 照片來源 ---------- */
function workPhotos(w){
  const arr = (w.photos || []).filter(p => p && String(p).trim());
  if (arr.length) return arr;
  const c = (w.cover && String(w.cover).trim()) ? String(w.cover).trim() : '';
  return c ? [c] : [];
}
function coverSrc(w){
  const p = workPhotos(w);
  return p.length ? p[0] : placeholder(w);
}
/* 圖片載入失敗時自動換成佔位圖，網站不會出現破圖 */
const FALLBACK_ATTR = 'data-ph';
function imgTag(src, ph, alt, extra){
  const isPh = (src === ph);
  return `<img src="${src}" alt="${esc(alt)}" loading="lazy"${extra ? ' ' + extra : ''}` +
    (isPh ? '' : ` ${FALLBACK_ATTR}="${ph}" onerror="this.onerror=null;this.src=this.getAttribute('data-ph')"`) + '>';
}

/* ---------- 產生卡片 ---------- */
function cardHTML(work, index){
  const meta = [work.year, work.medium].filter(Boolean).join('・');
  const tags = (work.tags || []).map(t => `<span class="tag">${esc(t)}</span>`).join('');
  const ph   = placeholder(work);
  const n    = workPhotos(work).length;
  return `<article class="card" data-index="${index}" tabindex="0" role="button" aria-label="查看作品：${esc(work.title)}">
    <div class="card-media">
      <span class="chip">${esc(work.category || '未分類')}</span>
      ${n > 1 ? `<span class="count">${n} 張照片</span>` : ''}
      ${imgTag(coverSrc(work), ph, work.title)}
    </div>
    <div class="card-body">
      <h3>${esc(work.title)}</h3>
      <div class="meta">${esc(meta)}</div>
      <p class="desc">${esc(work.desc)}</p>
      <div class="tagrow">${tags}</div>
    </div>
  </article>`;
}

function renderGrid(el, list){
  if (!el) return;
  if (!list || !list.length){
    el.innerHTML = '<p class="muted">這裡還沒有作品。把照片放進 <code>images</code> 資料夾，再雙擊 <code>build-works.bat</code> 就會自動出現。</p>';
    el._list = [];
    return;
  }
  el.innerHTML = list.map(cardHTML).join('');
  el._list = list;
}

/* ---------- 篩選器 ---------- */
function buildFilters(list, target, onPick){
  if (!target) return;
  const cats = ['全部'].concat(Array.from(new Set(list.map(w => w.category || '未分類'))));
  target.innerHTML = cats.map((c, i) =>
    `<button type="button" data-cat="${esc(c)}" class="${i === 0 ? 'is-active' : ''}">${esc(c)}</button>`).join('');
  target.addEventListener('click', e => {
    const btn = e.target.closest('button');
    if (!btn) return;
    $$('button', target).forEach(b => b.classList.remove('is-active'));
    btn.classList.add('is-active');
    onPick(btn.dataset.cat);
  });
}

/* ---------- 燈箱 ---------- */
let LB = null;
function buildLightbox(){
  if (LB) return LB;
  const div = document.createElement('div');
  div.className = 'lightbox';
  div.id = 'lightbox';
  div.setAttribute('aria-hidden','true');
  div.innerHTML = `
    <button class="lb-close" type="button" aria-label="關閉">×</button>
    <button class="lb-nav lb-prev" type="button" aria-label="上一件作品">‹</button>
    <button class="lb-nav lb-next" type="button" aria-label="下一件作品">›</button>
    <div class="lb-body">
      <div class="lb-media">
        <img alt="">
        <div class="lb-thumbs"></div>
        <div class="lb-hint">← → 換作品・點下方縮圖換照片</div>
      </div>
      <div class="lb-info">
        <span class="chip"></span>
        <h3></h3>
        <p class="lb-meta"></p>
        <p class="lb-count"></p>
        <p class="lb-desc"></p>
        <div class="lb-tags"></div>
        <div class="lb-links"></div>
      </div>
    </div>`;
  document.body.appendChild(div);
  div.addEventListener('click', e => { if (e.target === div) closeLightbox(); });
  $('.lb-close', div).addEventListener('click', closeLightbox);
  $('.lb-prev', div).addEventListener('click', () => stepLightbox(-1));
  $('.lb-next', div).addEventListener('click', () => stepLightbox(1));
  $('.lb-thumbs', div).addEventListener('click', e => {
    const b = e.target.closest('button');
    if (!b) return;
    LB._pi = Number(b.dataset.i);
    paintLightbox();
  });
  document.addEventListener('keydown', e => {
    if (!div.classList.contains('is-open')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') stepLightbox(-1);
    if (e.key === 'ArrowRight') stepLightbox(1);
  });
  LB = div;
  return div;
}

function openLightbox(list, index){
  const box = buildLightbox();
  box._list = list;
  box._i = index;
  box._pi = 0;
  paintLightbox();
  box.classList.add('is-open');
  box.setAttribute('aria-hidden','false');
  document.body.style.overflow = 'hidden';
}
function closeLightbox(){
  if (!LB) return;
  LB.classList.remove('is-open');
  LB.setAttribute('aria-hidden','true');
  document.body.style.overflow = '';
}
function stepLightbox(dir){
  if (!LB || !LB._list) return;
  const n = LB._list.length;
  LB._i = (LB._i + dir + n) % n;
  LB._pi = 0;
  paintLightbox();
}
function paintLightbox(){
  const w = LB._list[LB._i];
  if (!w) return;
  const photos = workPhotos(w);
  if (LB._pi == null || LB._pi >= photos.length) LB._pi = 0;
  const ph = placeholder(w);

  const img = $('.lb-media img', LB);
  img.onerror = function(){ this.onerror = null; this.src = this.getAttribute('data-ph'); };
  img.setAttribute('data-ph', ph);
  img.src = photos.length ? photos[LB._pi] : ph;
  img.alt = w.title;

  const thumbs = $('.lb-thumbs', LB);
  if (photos.length > 1){
    thumbs.style.display = 'flex';
    thumbs.innerHTML = photos.map((p, i) =>
      `<button type="button" class="${i === LB._pi ? 'is-active' : ''}" data-i="${i}" aria-label="第 ${i+1} 張">
        ${imgTag(p, ph, '')}</button>`).join('');
  } else {
    thumbs.style.display = 'none';
    thumbs.innerHTML = '';
  }

  $('.lb-info .chip', LB).textContent = w.category || '未分類';
  $('.lb-info h3', LB).textContent = w.title;
  $('.lb-meta', LB).textContent = [w.year, w.medium, (w.tags || []).join('・')].filter(Boolean).join('｜');
  $('.lb-count', LB).textContent = photos.length > 1 ? `照片 ${LB._pi + 1} / ${photos.length}` : '';
  $('.lb-desc', LB).textContent = w.desc || '';
  $('.lb-tags', LB).innerHTML = (w.tags || []).map(t => `<span class="tag">${esc(t)}</span>`).join('');

  const links = w.links || {};
  const items = Object.keys(links)
    .filter(k => links[k] && String(links[k]).trim())
    .map(k => {
      const s = (SITE.social || {})[k] || { label: k };
      return `<a href="${esc(links[k])}" target="_blank" rel="noopener">${ICONS[k] || ICONS.link}${esc(s.label || k)} 貼文</a>`;
    });
  $('.lb-links', LB).innerHTML = items.length
    ? items.join('')
    : '<span class="muted">這件作品的社群貼文連結還沒填（在 works.js 的 links 欄位填入即可）。</span>';
}

/* ---------- 社群區塊 ---------- */
function hasUrl(s){ return !!(s && s.url && String(s.url).trim()); }

function renderSocial(el){
  if (!el || !SITE.social) return;
  el.innerHTML = Object.keys(SITE.social).map(k => {
    const s = SITE.social[k];
    const ico = `<span class="social-ico" style="background:${SOCIAL_COLOR[k] || '#14181F'}">${ICONS[k] || ICONS.link}</span>`;
    const body = `<span>
        <span class="name">${esc(s.label)}</span><br>
        <span class="handle">${esc(s.handle)}</span>
      </span>`;
    if (!hasUrl(s)){
      return `<span class="social-card is-pending" title="還沒有填入網址">
        ${ico}${body}
        <span class="go">網址待補</span>
      </span>`;
    }
    return `<a class="social-card" href="${esc(s.url)}" target="_blank" rel="noopener">
      ${ico}${body}
      <span class="go">追蹤 →</span>
    </a>`;
  }).join('');
}

/* ---------- 文字套版 ---------- */
function applySiteText(){
  $$('[data-site-name]').forEach(el => el.textContent = SITE.siteName);
  $$('[data-author]').forEach(el => el.textContent = SITE.author);
  $$('[data-tagline]').forEach(el => el.textContent = SITE.tagline);
  $$('[data-intro]').forEach(el => el.textContent = SITE.intro);
  $$('[data-location]').forEach(el => el.textContent = SITE.location);
  $$('[data-year]').forEach(el => el.textContent = new Date().getFullYear());
  $$('[data-email]').forEach(el => {
    el.textContent = SITE.email;
    if (el.tagName === 'A') el.href = 'mailto:' + SITE.email;
  });
  $$('[data-social-mini]').forEach(mini => {
    mini.innerHTML = Object.keys(SITE.social || {})
      .filter(k => hasUrl(SITE.social[k]))
      .map(k => `<a href="${esc(SITE.social[k].url)}" target="_blank" rel="noopener">${ICONS[k] || ICONS.link}${esc(SITE.social[k].label)}</a>`)
      .join('');
  });
  const path = location.pathname.split('/').pop() || 'index.html';
  $$('.site-nav a').forEach(a => {
    if (a.getAttribute('href') === path) a.classList.add('is-active');
  });
}

/* ---------- 啟動 ---------- */
function setupGallery(list, gridSel, filterSel){
  const grid = $(gridSel);
  if (!grid) return;
  renderGrid(grid, list);
  buildFilters(list, $(filterSel), cat => {
    renderGrid(grid, cat === '全部' ? list : list.filter(w => (w.category || '未分類') === cat));
  });
  grid.addEventListener('click', e => {
    const card = e.target.closest('.card');
    if (!card) return;
    openLightbox(grid._list, Number(card.dataset.index));
  });
  grid.addEventListener('keydown', e => {
    if (e.key !== 'Enter' && e.key !== ' ') return;
    const card = e.target.closest('.card');
    if (!card) return;
    e.preventDefault();
    openLightbox(grid._list, Number(card.dataset.index));
  });
}

document.addEventListener('DOMContentLoaded', () => {
  applySiteText();

  const lf = $('#lego-featured');
  if (lf) renderGrid(lf, WORKS.filter(w => w.featured).slice(0, 3));
  const af = $('#art-featured');
  if (af) renderGrid(af, ARTS.filter(w => w.featured).slice(0, 3));

  const sl = $('#stat-lego');  if (sl) sl.textContent = WORKS.length;
  const sa = $('#stat-art');   if (sa) sa.textContent = ARTS.length;
  const sp = $('#stat-photos');
  if (sp) sp.textContent = WORKS.reduce((n, w) => n + workPhotos(w).length, 0);
  const sc = $('#stat-cats');
  if (sc) sc.textContent = new Set(WORKS.map(w => w.category || '未分類')).size;
  const sf = $('#stat-platforms');
  if (sf) sf.textContent = Object.keys(SITE.social || {}).length;

  setupGallery(WORKS, '#lego-grid', '#lego-filters');
  setupGallery(ARTS,  '#art-grid',  '#art-filters');

  const sg = $('#social-grid'); if (sg) renderSocial(sg);
});
