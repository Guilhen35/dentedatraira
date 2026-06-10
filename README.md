# 🎣 Dente da Traíra — Site Oficial

Site de mídia kit e presença digital de **Matheus Alexandre**, criador de conteúdo de pesca esportiva.

## 📁 Estrutura do projeto

```
dentedatraira/
├── index.html        → Site público
├── style.css         → Estilos
├── script.js         → JavaScript (métricas, loja, vídeos)
├── assets/           → Imagens e logos
└── admin/
    └── admin.html    → Painel administrativo (senha: admin123)
```

## 🚀 Como rodar localmente

**Opção 1 — Live Server (VS Code)**
- Instale a extensão Live Server
- Clique com botão direito em `index.html` → Open with Live Server

**Opção 2 — Python**
```bash
python -m http.server 5500
```

**Opção 3 — Node.js**
```bash
npx serve .
```

Acesse: `http://localhost:5500`
Admin: `http://localhost:5500/admin/admin.html`

## ⚙️ Painel Admin

- Acesse `/admin/admin.html`
- Senha padrão: `admin123`
- Gerencie métricas, loja e vídeos sem mexer no código

## 🌐 Deploy

Hospedado via **Vercel** ou **GitHub Pages**.

---

Desenvolvido por [Lithuan Studio](https://www.lithuanstudio.com.br/)
