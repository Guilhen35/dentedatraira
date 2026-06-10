/* =============================================
   ⚙️ DENTE DA TRAÍRA - JAVASCRIPT
   ============================================= */

// ---- ANO NO FOOTER ----
document.getElementById('ano').textContent = new Date().getFullYear();

// ---- MODAL DESENVOLVIDO POR ----
function abrirDevSection(e) {
  e.preventDefault();
  document.getElementById('devModal').classList.add('open');
  document.body.style.overflow = 'hidden';
  // fecha o menu mobile se estiver aberto
  document.getElementById('menu').classList.remove('open');
}
function fecharDevSection() {
  document.getElementById('devModal').classList.remove('open');
  document.body.style.overflow = '';
}
// Fecha com ESC
document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') fecharDevSection();
});

// ---- MENU MOBILE ----
const burger = document.getElementById('burger');
const menu   = document.getElementById('menu');
burger.addEventListener('click', () => menu.classList.toggle('open'));
menu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => menu.classList.remove('open')));

// ---- HEADER EFEITO AO ROLAR ----
const header = document.getElementById('topo');
window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 40);
});

// ---- ANIMAÇÃO REVEAL ----
const obs = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('show'); obs.unobserve(e.target); }
  });
}, { threshold: .15 });
document.querySelectorAll('.reveal').forEach(el => obs.observe(el));

// =============================================
// 📊 MÉTRICAS DAS REDES SOCIAIS
// Para editar os números use o Painel Admin em /admin/admin.html
// =============================================
function carregarMetricas() {
  const salvo = localStorage.getItem('redeSocial');
  return salvo ? JSON.parse(salvo) : [
    {
      plataforma: 'Instagram',
      numero: 363000,
      label: 'Seguidores',
      link: 'https://www.instagram.com/dentedatraira/'
    },
    {
      plataforma: 'Facebook',
      numero: 872,
      label: 'Seguidores',
      link: 'https://www.facebook.com/dentedatraira'
    },
    {
      plataforma: 'YouTube',
      numero: 200000,
      label: 'Inscritos',
      link: 'https://www.youtube.com/@dentedatraira'
    },
    {
      plataforma: 'TikTok',
      numero: 229000,
      label: 'Seguidores',
      link: 'https://www.tiktok.com/@dentedatraira'
    }
  ];
}

function formatarNumero(n) {
  if (n >= 1000000) return (n / 1000000).toFixed(1).replace('.', ',') + ' M';
  if (n >= 1000)    return (n / 1000).toFixed(0) + ' k';
  return n.toLocaleString('pt-BR');
}

const ICONES = {
  Instagram: `<svg width="36" height="36" viewBox="0 0 24 24" fill="none">
    <defs>
      <linearGradient id="ig" x1="0%" y1="100%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="#f09433"/>
        <stop offset="25%" stop-color="#e6683c"/>
        <stop offset="50%" stop-color="#dc2743"/>
        <stop offset="75%" stop-color="#cc2366"/>
        <stop offset="100%" stop-color="#bc1888"/>
      </linearGradient>
    </defs>
    <rect x="2" y="2" width="20" height="20" rx="6" stroke="url(#ig)" stroke-width="2" fill="none"/>
    <circle cx="12" cy="12" r="4.5" stroke="url(#ig)" stroke-width="2" fill="none"/>
    <circle cx="17.5" cy="6.5" r="1.2" fill="url(#ig)"/>
  </svg>`,

  Facebook: `<svg width="36" height="36" viewBox="0 0 24 24" fill="none">
    <rect x="2" y="2" width="20" height="20" rx="6" fill="#1877f2"/>
    <path d="M13 21v-7h2.5l.5-3H13V9.5c0-.83.42-1.5 1.5-1.5H16V5.5S15.2 5 14 5c-2.2 0-3.5 1.3-3.5 3.5V11H8v3h2.5v7H13z" fill="white"/>
  </svg>`,

  YouTube: `<svg width="36" height="36" viewBox="0 0 24 24" fill="none">
    <rect x="2" y="5" width="20" height="14" rx="4" fill="#FF0000"/>
    <path d="M10 9.5l5 2.5-5 2.5V9.5z" fill="white"/>
  </svg>`,

  TikTok: `<svg width="36" height="36" viewBox="0 0 24 24" fill="none">
    <path d="M19 3h-3v9.5a2.5 2.5 0 1 1-2.5-2.5c.17 0 .34.02.5.05V7a6 6 0 1 0 6 6V8.5A8.48 8.48 0 0 0 19 9V3z" fill="white"/>
    <path d="M16 3h3v6a8.48 8.48 0 0 1-3-.5V3z" fill="#69C9D0"/>
    <path d="M13.5 10a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5z" fill="#EE1D52" opacity=".6"/>
  </svg>`,

  Total: `<svg width="36" height="36" viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="9" stroke="#1fe3c2" stroke-width="2" fill="none"/>
    <path d="M12 3C12 3 16 7 16 12C16 17 12 21 12 21" stroke="#1fe3c2" stroke-width="1.5" fill="none"/>
    <path d="M12 3C12 3 8 7 8 12C8 17 12 21 12 21" stroke="#1fe3c2" stroke-width="1.5" fill="none"/>
    <line x1="3.5" y1="9" x2="20.5" y2="9" stroke="#1fe3c2" stroke-width="1.5"/>
    <line x1="3.5" y1="15" x2="20.5" y2="15" stroke="#1fe3c2" stroke-width="1.5"/>
  </svg>`
};

function renderMetricas() {
  const redes = carregarMetricas();
  const total = redes.reduce((soma, r) => soma + r.numero, 0);
  const container = document.getElementById('metrics-container');
  if (!container) return;

  const cardsRedes = redes.map(r => `
    <a href="${r.link}" target="_blank" style="text-decoration:none;color:inherit;">
      <div class="metric-card reveal">
        <div class="metric-icon">${ICONES[r.plataforma] || ''}</div>
        <div class="metric-number">${formatarNumero(r.numero)}</div>
        <div class="metric-label">${r.label}</div>
        <div class="metric-platform">${r.plataforma}</div>
      </div>
    </a>
  `).join('');

  const cardTotal = `
    <div class="metric-card total reveal">
      <div class="metric-icon">${ICONES.Total}</div>
      <div class="metric-texts">
        <div class="metric-number">${formatarNumero(total)}</div>
        <div class="metric-label">Seguidores Totais</div>
        <div class="metric-platform">Todas as Plataformas</div>
      </div>
    </div>
  `;

  container.innerHTML = cardsRedes + cardTotal;
  container.querySelectorAll('.reveal').forEach(el => obs.observe(el));
}
renderMetricas();

// ---- HERO BADGE ----
function atualizarHeroBadge() {
  const redes = carregarMetricas();
  const instagramNum = redes[0]?.numero || 363000;
  const badgeEl = document.getElementById('hero-badge-num');
  if (badgeEl) badgeEl.textContent = formatarNumero(instagramNum);
  const total = redes.reduce((soma, r) => soma + r.numero, 0);
  const totalEl = document.getElementById('hero-total');
  if (totalEl) totalEl.textContent = formatarNumero(total) + '+';
}
atualizarHeroBadge();

// ---- SCROLL HINT ----
const scrollHint = document.getElementById('scrollHint');
if (scrollHint) {
  window.addEventListener('scroll', () => {
    scrollHint.classList.toggle('hidden', window.scrollY > 100);
  }, { passive: true });
}

// =============================================
// 🤝 PARCEIROS
// =============================================
const PATROCINADORES = [
  {
    nome: 'Koi Fishing Wear',
    logo: 'assets/koi-logo.png',
    link: 'https://www.instagram.com/koifishingwear/'
  },
  {
    nome: 'Albatroz Fishing',
    logo: 'assets/albatroz-logo.png',
    link: 'https://www.instagram.com/albatrozfishing/'
  }
];

document.getElementById('lista-patrocinadores').innerHTML = PATROCINADORES.map(p =>
  '<a class="sponsor reveal" href="' + p.link + '" target="_blank">' +
  '<div class="logo-box"><img src="' + p.logo + '" alt="Logo ' + p.nome + '" /></div>' +
  '<h3>' + p.nome + '</h3></a>'
).join('');

// =============================================
// 🛍️ LOJA — carregada do Admin (localStorage)
// =============================================
function carregarAfiliados() {
  var salvo = localStorage.getItem('lojaProdutos');
  return salvo ? JSON.parse(salvo) : [
    { tag: 'Vestuário',   titulo: 'Camiseta UV Koi', desc: 'Proteção solar UV50+', emoji: '👕', link: 'https://www.instagram.com/koifishingwear/' },
    { tag: 'Equipamento', titulo: 'Vara Albatroz',   desc: 'Vara de ação pesada',  emoji: '🎣', link: 'https://www.instagram.com/albatrozfishing/' },
    { tag: 'Acessório',   titulo: 'Kit de Iscas',    desc: 'Seleção testada',      emoji: '🪝', link: '#' }
  ];
}

function renderLoja() {
  var lista = carregarAfiliados();
  var container = document.getElementById('lista-afiliados');
  if (!container) return;

  if (lista.length === 0) {
    container.innerHTML = '';
    return;
  }

  container.innerHTML = lista.map(function(a) {
    return '<a class="aff-card reveal" href="' + a.link + '" target="_blank" rel="noopener">' +
      '<div class="aff-thumb">' + (a.emoji || '🎣') + '</div>' +
      '<div class="aff-body">' +
        '<span class="tag">' + a.tag + '</span>' +
        '<h3>' + a.titulo + '</h3>' +
        '<p>' + a.desc + '</p>' +
        '<span class="aff-link">Comprar agora</span>' +
      '</div></a>';
  }).join('');

  container.querySelectorAll('.reveal').forEach(function(el) { obs.observe(el); });
}
renderLoja();

// =============================================
// 🎬 VÍDEOS — carregados do Admin (localStorage)
// =============================================
function carregarVideos() {
  var salvo = localStorage.getItem('videosDestaque');
  return salvo ? JSON.parse(salvo) : [
    { secao: 'Sorteio',  titulo: 'Sorteio de vara nova', url: 'https://www.instagram.com/reel/exemplo1/' },
    { secao: 'Promoção', titulo: 'Cupom dos parceiros',  url: 'https://www.instagram.com/reel/exemplo2/' },
    { secao: 'Destaque', titulo: 'Pirarara gigante',     url: 'https://www.instagram.com/reel/exemplo3/' }
  ];
}

function renderVideos() {
  var videos = carregarVideos();
  var container = document.getElementById('lista-videos');
  if (!container) return;

  // Garante que o link seja da post/reel direto (sem query strings)
  function limparUrl(url) {
    return url.split('?')[0].replace(/\/$/, '') + '/';
  }

  container.innerHTML = videos.map(function(v) {
    var urlLimpa = limparUrl(v.url);
    return '<a class="video-card reveal" href="' + urlLimpa + '" target="_blank" rel="noopener">' +
      '<div class="video-frame">' +
        '<blockquote class="instagram-media"' +
          ' data-instgrm-permalink="' + urlLimpa + '"' +
          ' data-instgrm-version="14"' +
          ' style="margin:0!important;width:100%!important;">' +
        '</blockquote>' +
      '</div>' +
      '<div class="video-meta">' +
        '<span class="tag">' + v.secao + '</span>' +
        '<h3>' + v.titulo + '</h3>' +
      '</div>' +
    '</a>';
  }).join('');

  // Recarrega o embed do Instagram nos novos elementos
  if (window.instgrm) {
    window.instgrm.Embeds.process();
  } else {
    var igScript = document.createElement('script');
    igScript.src = 'https://www.instagram.com/embed.js';
    igScript.async = true;
    document.body.appendChild(igScript);
  }

  container.querySelectorAll('.reveal').forEach(function(el) { obs.observe(el); });
}
renderVideos();

document.querySelectorAll('.sponsor.reveal,.aff-card.reveal').forEach(el => obs.observe(el));
