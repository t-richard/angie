# Technical Plan — Angie Portfolio

## Stack
- **Jekyll** static site generator
- **GitHub Actions** for CI/CD
- **GitHub Pages** (user site, `baseurl: ""`)
- Vanilla JS (no framework)
- CSS custom properties (no preprocessor)

---

## Project Structure

```
angie/
├── _config.yml
├── Gemfile
├── _data/
│   ├── profile.yml
│   ├── marketing.yml
│   ├── vente.yml
│   ├── communication.yml
│   ├── business_developpement.yml
│   └── management_relation_client.yml
├── _layouts/
│   ├── default.html       # base layout: head + fixed nav + body + modal shell
│   └── category.html      # extends default, renders card grid from _data
├── _includes/
│   ├── nav.html            # fixed top nav
│   ├── splash.html         # splash overlay + header tagline
│   ├── card.html           # competency card partial
│   └── modal.html          # modal shell (populated by JS)
├── assets/
│   ├── css/
│   │   └── main.css
│   ├── js/
│   │   └── main.js
│   └── images/
│       ├── placeholder.svg
│       ├── profile.jpg     # to be provided
│       └── qr-linkedin.svg # to be provided
├── index.html              # home page
├── marketing.html
├── vente.html
├── communication.html
├── business-developpement.html
├── management-relation-client.html
└── .github/
    └── workflows/
        └── deploy.yml
```

---

## Data Schemas

### `_data/profile.yml`
```yaml
name: "Prénom Nom"
title: "Titre / Rôle"
description: "Courte description professionnelle."
interests:
  - "Intérêt 1"
  - "Intérêt 2"
  - "Intérêt 3"
linkedin_url: "https://linkedin.com/in/..."
```

### `_data/[category].yml`
```yaml
title: "Marketing"
slug: "marketing"
competences:
  - id: "competence-1"
    title: "Titre de la compétence"
    summary: "Texte court affiché sur la carte."
    body: "Texte complet affiché dans la modale."
    image: "/assets/images/placeholder.svg"
  # ... 5 more
```

---

## Layouts & Includes

### `default.html`
- `<head>`: meta, Inter + serif font (Google Fonts), `main.css`
- `{% include splash.html %}`
- `{% include nav.html %}`
- `<main>{{ content }}</main>`
- `{% include modal.html %}`
- `main.js` at end of body

### `category.html` (extends default)
- Reads `site.data[page.data_key]`
- Renders `{% include card.html %}` in a 2-col CSS grid
- Each card outputs data attributes: `data-title`, `data-body`, `data-image`

---

## CSS Architecture (`main.css`)

Custom properties on `:root`:
```css
--bg: #fafafa;
--text: #1a2333;
--text-muted: #4a5568;
--accent: #d4a017;      /* mustard yellow */
--accent-dark: #b8860b;
--radius: 8px;
--transition: 200ms ease;
```

Sections:
1. **Reset & base** — box-sizing, font stack (Inter), heading font (Lora)
2. **Splash** — full-screen overlay, centered text, fade-out animation
3. **Header tagline** — small persistent text after splash collapses
4. **Nav** — fixed top bar, flex layout, active state on current page
5. **Home** — profile block (photo + name + description + interests + QR)
6. **Category grid** — CSS grid, 2 columns, gap, responsive breakpoint at 640px → 1 column
7. **Card** — image, title, summary, hover lift (`transform: translateY(-3px)`, box-shadow)
8. **Modal** — fixed overlay, dark backdrop, content box, close button, fade + scale animation

---

## JavaScript (`main.js`)

Three responsibilities:

### 1. Splash screen
```
- On DOMContentLoaded: show splash overlay
- After 2500ms (or on click): add .splash--collapsed class
- CSS transition handles: full-screen → small header text
```

### 2. Modal
```
- Delegate click on [data-modal-trigger] cards
- Read data-title, data-body, data-image from clicked card
- Populate #modal with content
- Add .modal--open class → CSS fade-in (200ms, scale 0.95→1)
- Close on: backdrop click, close button click, Escape key
- Trap focus inside modal while open
```

### 3. Active nav link
```
- On load: compare window.location.pathname to each nav link href
- Add .nav__link--active to matching link
```

---

## Animations

| Element | Trigger | Animation |
|---|---|---|
| Splash overlay | Auto after 2.5s / click | Fade out (`opacity 0`, `pointer-events: none`) |
| Splash text | Splash collapses | Scale down + reposition to header area |
| Card | Hover | `translateY(-3px)` + box-shadow, 150ms |
| Modal | Open | Fade in + scale `0.95 → 1`, 200ms |
| Modal | Close | Fade out, 150ms |

---

## GitHub Actions (`deploy.yml`)

```yaml
on:
  push:
    branches: [main]

jobs:
  build-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: ruby/setup-ruby@v1
        with:
          bundler-cache: true
      - run: bundle exec jekyll build
      - uses: peaceiris/actions-gh-pages@v4
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./_site
```

---

## Fonts

- **Body**: Inter (400, 500) — Google Fonts
- **Headings**: Lora (600, 700) — Google Fonts
- Self-host via `@font-face` if offline demo is required

---

## Implementation Order

1. `_config.yml` + `Gemfile` — Jekyll bootstrap
2. `main.css` — design tokens + reset + base styles
3. `default.html` layout + `nav.html` include
4. Splash screen (HTML + CSS + JS)
5. Home page (`index.html`) with `profile.yml` placeholders
6. `category.html` layout + `card.html` include + data files (all placeholder content)
7. Modal (HTML shell + CSS + JS)
8. All 5 category pages wired to their data files
9. Mobile responsive pass
10. GitHub Actions workflow
11. QR code + real images swap-in (deferred)
