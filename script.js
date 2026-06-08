/* =============================================
   ⚙️ DENTE DA TRAÍRA - JAVASCRIPT
   Arquivo: script.js
   ============================================= */

// ---- ANO NO FOOTER ----
document.getElementById('ano').textContent = new Date().getFullYear();

// =============================================
// 🪝 CURSOR PERSONALIZADO — Anzol
// =============================================

// 1. Cria o elemento <div class="cursor"> e injeta o SVG do anzol dentro
const cursor = document.createElement('div');
cursor.classList.add('cursor');

// SVG do anzol desenhado à mão com coordenadas
// Você pode mudar a cor trocando os valores de stroke e fill abaixo
cursor.innerHTML = `
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <!-- Haste vertical do anzol -->
    <line x1="16" y1="2" x2="16" y2="18" stroke="#1fe3c2" stroke-width="2.2" stroke-linecap="round"/>
    <!-- Curva do anzol (arco) -->
    <path d="M16 18 Q26 18 26 26 Q26 31 20 31" stroke="#1fe3c2" stroke-width="2.2" stroke-linecap="round" fill="none"/>
    <!-- Ponta do anzol (farpinha) -->
    <path d="M20 31 L17 27" stroke="#1fe3c2" stroke-width="2" stroke-linecap="round"/>
    <!-- Olhal (argola no topo) -->
    <circle cx="16" cy="2" r="2.5" stroke="#f0b53d" stroke-width="2" fill="none"/>
  </svg>
`;

// 2. Adiciona o cursor no final do body
document.body.appendChild(cursor);

// 3. Faz o cursor seguir o mouse
document.addEventListener('mousemove', (e) => {
  // Posiciona o div exatamente onde o mouse está
  cursor.style.left = e.clientX + 'px';
  cursor.style.top  = e.clientY + 'px';
  cursor.classList.remove('hidden');
});

// 4. Some quando o mouse sai da janela do navegador
document.addEventListener('mouseleave', () => cursor.classList.add('hidden'));
document.addEventListener('mouseenter', () => cursor.classList.remove('hidden'));

// 5. Efeito de clique: encolhe o anzol por 150ms
document.addEventListener('mousedown', () => cursor.classList.add('click'));
document.addEventListener('mouseup',   () => cursor.classList.remove('click'));

// 6. Cresce quando passa em cima de links, botões e coisas clicáveis
const clicaveis = 'a, button, .btn, .card, .sponsor, .aff-card, .metric-card';
document.querySelectorAll(clicaveis).forEach(el => {
  el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
  el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
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

// ---- ANIMAÇÃO REVEAL (aparecer ao entrar na tela) ----
const obs = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('show'); obs.unobserve(e.target); }
  });
}, { threshold: .15 });
document.querySelectorAll('.reveal').forEach(el => obs.observe(el));

// =============================================
// 📊 MÉTRICAS DAS REDES SOCIAIS
// Para editar os números, mude aqui embaixo
// Ou use o Painel Admin em /admin/admin.html
// =============================================
function carregarMetricas() {
  const salvo = localStorage.getItem('redeSocial');
  return salvo ? JSON.parse(salvo) : [
    {
      icon: '📸',
      numero: 363000,       // ← INSTAGRAM: mude aqui
      label: 'Seguidores',
      plataforma: 'Instagram',
      link: 'https://www.instagram.com/dentedatraira/'
    },
    {
      icon: '📺',
      numero: 202000,       // ← YOUTUBE: mude aqui
      label: 'Inscritos',
      plataforma: 'YouTube',
      link: 'https://www.youtube.com/@dentedatraira'
    },
    {
      icon: '🎵',
      numero: 923500,       // ← TIKTOK: mude aqui
      label: 'Seguidores',
      plataforma: 'TikTok',
      link: 'https://www.tiktok.com/@dentedatraira'
    }
  ];
}

function formatarNumero(n) {
  if (n >= 1000000) return (n / 1000000).toFixed(1).replace('.', ',') + ' M';
  if (n >= 1000)    return (n / 1000).toFixed(0) + ' k';
  return n.toString();
}


// Ícones SVG reais de cada rede social
// São os logos oficiais desenhados em SVG puro — sem precisar de imagem externa
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

  // Cada card das redes sociais
  const cardsRedes = redes.map(r => `
    <a href="${r.link}" target="_blank" style="text-decoration:none;color:inherit;">
      <div class="metric-card reveal">
        <div class="metric-icon">${ICONES[r.plataforma] || r.icon}</div>
        <div class="metric-number">${formatarNumero(r.numero)}</div>
        <div class="metric-label">${r.label}</div>
        <div class="metric-platform">${r.plataforma}</div>
      </div>
    </a>
  `).join('');

  // Card total separado na segunda linha
  const cardTotal = `
    <div class="metric-card total reveal">
      <div class="metric-icon">${ICONES.Total}</div>
      <div class="metric-number">${formatarNumero(total)}</div>
      <div class="metric-label">Seguidores Totais</div>
      <div class="metric-platform">Todas as Plataformas</div>
    </div>
  `;

  container.innerHTML = cardsRedes + cardTotal;
  container.querySelectorAll('.reveal').forEach(el => obs.observe(el));
}
renderMetricas();



// =============================================
// 🎯 HERO — atualizações dinâmicas
// =============================================

// Esconde a seta "Role para baixo" quando o usuário rolar a página
const scrollHint = document.getElementById('scrollHint');
if (scrollHint) {
  window.addEventListener('scroll', () => {
    // Se rolou mais de 100px, adiciona a classe "hidden" que some a seta (CSS cuida do resto)
    scrollHint.classList.toggle('hidden', window.scrollY > 100);
  }, { passive: true }); // passive: true = melhor performance, não bloqueia o scroll
}

// Atualiza o badge de seguidores e o total nos mini stats do Hero
// com os mesmos dados que já existem no Admin (localStorage)
function atualizarHeroBadge() {
  const redes = carregarMetricas(); // reusa a função que já existe acima

  // Badge da foto: pega o número do Instagram (primeiro item do array)
  const instagramNum = redes[0]?.numero || 363000;
  // O ?. é "optional chaining" — evita erro se redes[0] for undefined
  const badgeEl = document.getElementById('hero-badge-num');
  if (badgeEl) badgeEl.textContent = formatarNumero(instagramNum);

  // Mini stat "total": soma todos os seguidores de todas as redes
  const total = redes.reduce((soma, r) => soma + r.numero, 0);
  // reduce() percorre o array somando os números — como um Σ matemático
  const totalEl = document.getElementById('hero-total');
  if (totalEl) totalEl.textContent = formatarNumero(total) + '+';
}
atualizarHeroBadge(); // chama na hora que a página carrega

// =============================================
// 🤝 PARCEIROS
// Para adicionar: copie um bloco e mude os dados
// =============================================
// DEPOIS (usando imagem real da marca)
const PATROCINADORES = [
  {
    nome: 'Koi Fishing Wear',
    logo: 'assets/koi-logo.png',      // ← caminho da imagem que você salvou
    link: 'https://www.instagram.com/koifishingwear/'
  },
  {
    nome: 'Albatroz Fishing',
    logo: 'assets/albatroz-logo.png', // ← caminho da imagem que você salvou
    link: 'https://www.instagram.com/albatrozfishing/'
  }
];

document.getElementById('lista-patrocinadores').innerHTML = PATROCINADORES.map(p =>
  '<a class="sponsor reveal" href="' + p.link + '" target="_blank">' +
  // A div .badge virou .logo-box com a imagem dentro
  '<div class="logo-box">' +
  '<img src="' + p.logo + '" alt="Logo ' + p.nome + '" />' +
  '</div>' +
  '<h3>' + p.nome + '</h3></a>'
).join('');

// =============================================
// 🛍️ LOJA (Afiliados)
// Para adicionar: copie um bloco e mude os dados
// =============================================
const AFILIADOS = [
  { tag: 'Vestuário',   titulo: 'Camiseta UV Koi', desc: 'Proteção solar UV50+', emoji: '👕', link: 'https://www.instagram.com/koifishingwear/' },
  { tag: 'Equipamento', titulo: 'Vara Albatroz',   desc: 'Vara de ação pesada',  emoji: '🎣', link: 'https://www.instagram.com/albatrozfishing/' },
  { tag: 'Acessório',   titulo: 'Kit de Iscas',    desc: 'Seleção testada',      emoji: '🪝', link: '#' }
];

document.getElementById('lista-afiliados').innerHTML = AFILIADOS.map(a =>
  '<a class="aff-card reveal" href="' + a.link + '" target="_blank">' +
  '<div class="aff-thumb">' + a.emoji + '</div>' +
  '<div class="aff-body">' +
  '<span class="tag">' + a.tag + '</span>' +
  '<h3>' + a.titulo + '</h3>' +
  '<p>' + a.desc + '</p>' +
  '<span class="aff-link">Comprar agora</span>' +
  '</div></a>'
).join('');

// =============================================
// 🎬 VÍDEOS
// Para adicionar: copie um bloco e mude os dados
// =============================================
const VIDEOS = [
  { tag: 'Sorteio',  titulo: 'Sorteio de vara nova', url: 'https://www.instagram.com/dentedatraira/' },
  { tag: 'Promoção', titulo: 'Cupom dos parceiros',  url: 'https://www.instagram.com/dentedatraira/' },
  { tag: 'Destaque', titulo: 'Pirarara gigante',     url: 'https://www.instagram.com/dentedatraira/' }
];

document.getElementById('lista-videos').innerHTML = VIDEOS.map(v =>
  '<div class="video-card reveal">' +
  '<div class="video-frame">' +
  '<blockquote class="instagram-media" data-instgrm-permalink="' + v.url + '" data-instgrm-version="14"></blockquote>' +
  '</div>' +
  '<div class="video-meta">' +
  '<span class="tag">' + v.tag + '</span>' +
  '<h3>' + v.titulo + '</h3>' +
  '</div></div>'
).join('');

// Carregar script do Instagram
const igScript = document.createElement('script');
igScript.src = 'https://www.instagram.com/embed.js';
igScript.async = true;
document.body.appendChild(igScript);

// Observar novos elementos criados dinamicamente pelo JS
document.querySelectorAll('.sponsor.reveal,.aff-card.reveal,.video-card.reveal').forEach(el => obs.observe(el));