# Tasks — Angie Portfolio

## Phase 1 — Jekyll Bootstrap

- [ ] Create `Gemfile` with Jekyll and github-pages gem
- [ ] Create `_config.yml` (title, baseurl, exclude list)
- [ ] Run `bundle install` and verify `jekyll serve` works

## Phase 2 — Design Tokens & Base CSS

- [ ] Create `assets/css/main.css` with `:root` custom properties (bg, text, accent, radius, transition)
- [ ] Add CSS reset (box-sizing, margin/padding zeroed)
- [ ] Set base font stack: Inter (body), Lora (headings)
- [ ] Add Google Fonts `<link>` tags (Inter 400/500, Lora 600/700)

## Phase 3 — Default Layout & Navigation

- [ ] Create `_layouts/default.html` (head, body shell, includes slots)
- [ ] Create `_includes/nav.html` with 5 links (Marketing, Vente, Communication, Business Développement, Management de la Relation Client)
- [ ] Style fixed top nav: flex layout, accent underline on active link
- [ ] Add `assets/images/placeholder.svg` for missing images

## Phase 4 — Splash Screen

- [ ] Create `_includes/splash.html` (full-screen overlay with welcome text)
- [ ] CSS: full-screen centered overlay, fade-out transition, collapsed header state
- [ ] JS in `assets/js/main.js`: auto-dismiss after 2500ms, dismiss on click, apply `.splash--collapsed`

## Phase 5 — Home Page

- [ ] Create `_data/profile.yml` with placeholder name, title, description, interests, linkedin_url
- [ ] Create `index.html` rendering profile data (photo, name, title, description, interests, QR code)
- [ ] Style home profile block: photo circle, name/title/description, interests list, QR code area
- [ ] Add `assets/images/profile.jpg` placeholder (or SVG stub)
- [ ] Add `assets/images/qr-linkedin.svg` placeholder

## Phase 6 — Category Layout & Cards

- [ ] Create `_layouts/category.html` extending default, reading `site.data[page.data_key]`
- [ ] Create `_includes/card.html` partial (image, title, summary, data attributes for modal)
- [ ] Style card grid: 2-column CSS grid, gap, responsive breakpoint → 1 column at 640px
- [ ] Style card: image top, title, summary, hover lift (`translateY(-3px)` + box-shadow, 150ms)
- [ ] Create `_data/marketing.yml` with 6 placeholder competences
- [ ] Create `_data/vente.yml` with 6 placeholder competences
- [ ] Create `_data/communication.yml` with 6 placeholder competences
- [ ] Create `_data/business_developpement.yml` with 6 placeholder competences
- [ ] Create `_data/management_relation_client.yml` with 6 placeholder competences

## Phase 7 — Category Pages

- [ ] Create `marketing.html` wired to `data_key: marketing`
- [ ] Create `vente.html` wired to `data_key: vente`
- [ ] Create `communication.html` wired to `data_key: communication`
- [ ] Create `business-developpement.html` wired to `data_key: business_developpement`
- [ ] Create `management-relation-client.html` wired to `data_key: management_relation_client`

## Phase 8 — Modal

- [ ] Create `_includes/modal.html` shell (`#modal` div with backdrop, content box, close button)
- [ ] CSS: fixed overlay, dark backdrop, content box centered, fade + scale animation (open/close)
- [ ] JS: delegate click on `[data-modal-trigger]`, populate modal with title/body/image, add `.modal--open`
- [ ] JS: close on backdrop click, close button click, Escape key
- [ ] JS: focus trap inside modal while open

## Phase 9 — Active Nav & Polish

- [ ] JS: detect current page path, add `.nav__link--active` to matching nav link
- [ ] Mobile responsive pass: nav wraps or collapses gracefully, profile block stacks vertically
- [ ] Cross-browser check: modal, splash, card hover all work in Chrome/Firefox/Safari

## Phase 10 — GitHub Actions Deployment

- [ ] Create `.github/workflows/deploy.yml` (build + peaceiris/actions-gh-pages)
- [ ] Verify build passes and site deploys to GitHub Pages

## Phase 11 — Real Content (deferred)

- [ ] Swap in real `profile.jpg`
- [ ] Generate and add real `qr-linkedin.svg` pointing to LinkedIn profile
- [ ] Fill all 5 category data files with real competence titles, summaries, bodies, and images
