# Checklist de Acessibilidade — Luna Valente Astrologia

## Estrutura e navegação
- [x] `lang="pt-BR"` no HTML
- [x] Skip link para conteúdo principal
- [x] Landmarks: `header`, `main`, `footer`, `nav`
- [x] Títulos hierárquicos (h1 → h2 → h3)
- [x] HashRouter com rotas semânticas no painel

## Formulários
- [x] Labels associados a todos os inputs
- [x] Mensagens de erro com `role="alert"`
- [x] SignFinder com `aria-live="polite"` no resultado
- [x] Modais com `role="dialog"` e `aria-modal`

## Visual e motion
- [x] Contraste AA em texto e botões
- [x] `:focus-visible` em interativos
- [x] `prefers-reduced-motion` desativa animações Framer Motion
- [x] Imagens com `alt` descritivo

## Testes automatizados
- Vitest: `zodiac`, `whatsapp`, `useServices`, `useClients`
- Playwright + axe-core: 0 violações critical/serious na landing

## Responsividade verificada
- Mobile 390px, tablet 768px, desktop 1280px
