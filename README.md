# Luna Valente — Astrologia Landing & Painel Demo

Demo completo para astróloga em React + Vite: landing de alta conversão com SignFinder (descobridor de signo solar), formulário WhatsApp e mini-app de gestão de clientes, consultas e serviços (localStorage).

[![Live Demo](https://img.shields.io/badge/demo-online-brightgreen)](https://tofariasti.github.io/landing-astrologo/)

## Demo

**Moldura (preview):** [https://tofariasti.github.io/landing-astrologo/](https://tofariasti.github.io/landing-astrologo/)

**Tela cheia:** [https://tofariasti.github.io/landing-astrologo/site/](https://tofariasti.github.io/landing-astrologo/site/)

## Screenshots

### Desktop (1280px)
![Desktop view](screenshots/desktop.png)

### Tablet (768px)
![Tablet view](screenshots/tablet.png)

### Mobile (390px)
![Mobile view](screenshots/mobile.png)

## Funcionalidades

### Landing pública
- Hero animado com estrelas, estatísticas e CTAs
- Sobre, serviços, metodologia
- SignFinder interativo (data → signo + elemento + modalidade + WhatsApp)
- Depoimentos, FAQ accordion
- Formulário estruturado → WhatsApp
- Botão flutuante WhatsApp

### Mini-app (painel demo)
- Dashboard com resumo e próximas consultas
- CRUD de clientes com consultas aninhadas
- CRUD de serviços astrológicos
- Configurações: tema claro/escuro, reset demo

## Design tokens (CSS)

| Token | Valor | Uso |
|-------|-------|-----|
| `--color-primary` | `#1a1033` | Indigo — marca, sidebar |
| `--color-gold` | `#d4a853` | Destaques, CTAs primários |
| `--color-lavender` | `#9b8ec4` | Acentos, bordas suaves |
| `--font-display` | Cinzel | Títulos |
| `--font-body` | DM Sans | Corpo e UI |

## Tecnologias

- React 19 + TypeScript + Vite
- React Router (HashRouter)
- Framer Motion
- Vitest + Testing Library
- Playwright + axe-core
- GitHub Pages

## Testes

```bash
npm test              # Vitest (unit/integration)
npm run test:e2e      # Playwright (requer build + servidor)
```

## Desenvolvimento local

```bash
npm install
npm run dev           # Vite dev server
npm run build         # Build para site/
python3 -m http.server 8765   # Moldura + site
```

## Screenshots (geração)

```bash
python3 -m http.server 8765
npm run build
npm run screenshots
```

## Testes de Responsividade

| Dispositivo | Resolução | Status | Verificado |
|-------------|-----------|--------|------------|
| iPhone 14 | 390×844 | ✅ | Hero, SignFinder, WhatsApp float |
| iPad | 768×1024 | ✅ | Grid serviços, FAQ |
| Desktop HD | 1280×720 | ✅ | Layout completo, moldura |

## Acessibilidade

- WCAG 2.1 AA (contraste, foco, labels)
- Skip link, landmarks, ARIA
- `prefers-reduced-motion` respeitado
- Checklist completo: [docs/a11y-checklist.md](docs/a11y-checklist.md)

## Estrutura

```
astrologo/
├── index.html              # Moldura iframe
├── assets/css/preview.css
├── assets/js/preview.js
├── src/                    # React source
├── site/                   # Build output (Vite)
├── screenshots/
├── e2e/                    # Playwright tests
├── scripts/capture-screenshots.mjs
└── .github/workflows/deploy.yml
```

## Personalização

1. **WhatsApp:** `WHATSAPP_NUMBER` em `src/config/constants.ts`
2. **Persona:** `ASTROLOGER` em `src/config/constants.ts`
3. **Cores:** variáveis CSS em `src/styles/global.css`

---

<p align="center">
  <a href="https://tofariasti.github.io/landing-astrologo/">🌐 Demo Online</a> ·
  <a href="https://fariasdigital.com.br/">🏢 Site Comercial</a>
</p>

<p align="center">
  Desenvolvido por <a href="https://fariasdigital.com.br/">Farias Digital</a>
</p>
