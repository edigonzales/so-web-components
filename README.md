# so-web-components

Vanilla **TypeScript** Web Components + ein kleines **Design-Token**-Set (CSS Custom Properties),
abgeleitet aus dem Layout-Prinzip von so.ch.

## Enthalten

- `src/styles/tokens.css` – Farben/Typografie/Container-Tokens  
  - Hintergrund: `#fff`  
  - Schriftfarbe: `rgb(47, 72, 88)`  
  - Schrift: `Frutiger, sans-serif`
- `src/components/so-header.ts` – `<so-header>` Web Component (Shadow DOM)
- `src/demo/index.html` – Demo-Seite
- `tests/so-header.test.ts` – Tests (Jest + JSDOM)

## Voraussetzungen

- Node.js >= 18
- npm

## Install

```bash
npm install
```

## Build

```bash
npm run build
```

Outputs:

- `dist/index.js` (ESM)
- `dist/index.d.ts`
- `dist/components/...`
- `dist/styles/tokens.css`
- `dist/styles/reset.css`
- `dist/demo/index.html`

## Tests

```bash
npm test
```

## Dev / Demo starten

### Live Reload (empfohlen)

```bash
npm run dev:hot
```

Das startet:

- TypeScript im Watch-Modus
- automatisches Kopieren von Demo/Styles nach `dist/`
- den Dev-Server mit Live-Reload

Dann im Browser öffnen:

- http://localhost:5173

### Ohne Live Reload

> Wichtig: Der Dev-Server serviert aus `dist/`. Deshalb immer zuerst `npm run build` ausführen.

```bash
npm run build
npm run dev
```

Dann im Browser öffnen:

- http://localhost:5173

## Verwendung

### 1) Fonts / Tokens / Reset laden

```html
<link rel="stylesheet" href="/dist/styles/reset.css">
<link rel="stylesheet" href="/dist/styles/fonts.css">
<link rel="stylesheet" href="/dist/styles/tokens.css">
```

### 2) Component laden und einsetzen

```html
<script type="module" src="/dist/index.js"></script>

<so-header></so-header>
```

### 3) Navigation konfigurieren (optional)

`top-nav` und `section-nav` sind JSON-Arrays:

```html
<so-header
  top-nav='[{"label":"Regierung","href":"/regierung"},{"label":"Gerichte","href":"/gerichte"}]'
  section-nav='[{"label":"Services","href":"/services"},{"label":"Verwaltung","href":"/verwaltung"}]'
  active-section="Services"
  logo-href="/"
  site-name="Kanton Solothurn"
></so-header>
```

## Events

- `so-section-select` → wird ausgelöst, wenn ein Bereich (Services/Verwaltung) geklickt wird  
  `detail: { label, href }`

## Customizing

Einfach per CSS Custom Properties:

```css
:root{
  --so-bg: #fff;
  --so-fg: rgb(47, 72, 88);

  /* z.B. Contentbreite/Gutters anpassen */
  --so-container-size-full: 120rem;
  --so-container-padding: 1rem;
}
```

> Hinweis: **Frutiger** muss auf dem System vorhanden sein (oder du bindest eine Webfont ein).

## Lizenz

MIT (für dieses Beispielprojekt).
