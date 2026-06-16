# so-web-components

Vanilla **TypeScript** Web Components + ein kleines **Design-Token**-Set (CSS Custom Properties),
abgeleitet aus dem Layout-Prinzip von so.ch.

## Enthalten

- `src/styles/tokens.css` – Farben/Typografie/Container-Tokens  
  - Hintergrund: `#fff`  
  - Schriftfarbe: `rgb(47, 72, 88)`  
  - Schrift: `Frutiger, sans-serif`
- `src/components/so-header.ts` – `<so-header>` Web Component (Shadow DOM)
- `src/components/so-breadcrumb.ts` – `<so-breadcrumb>` Web Component (Shadow DOM)
- `src/components/so-lead-text.ts` – `<so-lead-text>` Web Component für Intro-/Lead-Absätze
- `src/demo/index.html` – Demo-Seite
- `src/demo/cdn-demo.html` – einfache CDN-Demo-Seite
- `tests/so-header.test.ts` – Tests (Jest + JSDOM)
- `tests/so-breadcrumb.test.ts` – Tests (Jest + JSDOM)
- `tests/so-lead-text.test.ts` – Tests (Jest + JSDOM)

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
- `dist/styles/fonts.css`
- `dist/styles/FrutigerLTW05-55Roman.woff2`
- `dist/styles/FrutigerLTW05-75Black.woff2`
- `dist/demo/index.html`
- `dist/demo/cdn-demo.html`

## Tests

```bash
npm test
```

## Publish (npm)

### Voraussetzungen

- npm Account
- **Automation Token** (Classic Tokens werden nicht mehr akzeptiert)
- GitHub Secret `NPM_TOKEN` im Repo hinterlegen (Automation Token)

> Optional: Alternativ kannst du **npm Trusted Publishing (OIDC)** aktivieren und dann ohne Token veröffentlichen.

### Ablauf

1) Änderungen auf `main` pushen (CI läuft).
2) Version taggen (Semver) und Tag pushen → Publish-Workflow lädt auf npm.

```bash
git tag v0.1.1
git push origin v0.1.1
```

## CDN Nutzung (nach npm Publish)

Nach dem Publish sind die Web Components z.B. über **unpkg** oder **jsDelivr** verfügbar:

```html
<script type="module" src="https://unpkg.com/so-web-components@latest/dist/index.js"></script>
```

```html
<script type="module" src="https://cdn.jsdelivr.net/npm/so-web-components@latest/dist/index.js"></script>
```

Optional ohne Versions-Pin:

```html
<script type="module" src="https://unpkg.com/so-web-components/dist/index.js"></script>
```

```html
<script type="module" src="https://cdn.jsdelivr.net/npm/so-web-components/dist/index.js"></script>
```

Hinweis:
- `@latest` ist möglich und lädt die aktuellste veröffentlichte Version.
- Für stabile Produktion empfiehlt sich trotzdem ein expliziter Versions-Pin (z.B. `@0.1.10`).

### Einfache Test-Webseite via CDN (Version `latest`)

Eine fertige Beispielseite liegt unter `src/demo/cdn-demo.html` (wird nach `dist/demo/cdn-demo.html` kopiert):

```html
<!doctype html>
<html lang="de">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <title>so-web-components CDN Demo</title>

  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/so-web-components@latest/dist/styles/reset.css" />
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/so-web-components@latest/dist/styles/fonts.css" />
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/so-web-components@latest/dist/styles/tokens.css" />
  <script type="module" src="https://cdn.jsdelivr.net/npm/so-web-components@latest/dist/index.js"></script>
</head>
<body>
  <so-header
    active-section="Verwaltung"
    site-name="Kanton Solothurn">
  </so-header>
  <so-breadcrumb>
    <so-breadcrumb-item href="/">Startseite</so-breadcrumb-item>
    <so-breadcrumb-item href="/beispiele">Beispiele</so-breadcrumb-item>
    <so-breadcrumb-item isCurrentPage>CDN Demo</so-breadcrumb-item>
  </so-breadcrumb>
</body>
</html>
```

Hinweis zu Fonts:

- Die Schrift wird **nicht** automatisch durch `index.js` nachgeladen.
- `dist/styles/fonts.css` muss explizit eingebunden werden (lokal oder via CDN).
- `fonts.css` referenziert die mitgelieferten `woff2`-Dateien aus `dist/styles/`.

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
<so-breadcrumb></so-breadcrumb>
<so-lead-text>
  <p>Ein kurzer Leadtext mit <a href="#">Link</a>.</p>
</so-lead-text>
```

### 3) Navigation konfigurieren (optional)

`top-nav` und `section-nav` sind JSON-Arrays:

```html
<so-header
  top-nav='[{"label":"Regierung","href":"https://so.ch/regierung/"},{"label":"Gerichte","href":"https://so.ch/gerichte/"}]'
  section-nav='[{"label":"Services","href":"/services"},{"label":"Verwaltung","href":"/verwaltung"}]'
  active-section="Services"
  logo-href="/"
  site-name="Kanton Solothurn"
></so-header>
```

## Generelle Informationen

- Alle Komponenten sind **Custom Elements** mit **Shadow DOM**.
- Konfiguration erfolgt über Attribute (meist JSON-Strings).
- Styling per CSS Custom Properties, die im Host-Kontext gesetzt werden können.

## Komponenten

### `<so-header>`

**Attribute**

- `top-nav`: JSON-Array aus `{ label, href }`
- `section-nav`: JSON-Array aus `{ label, href }`
- `active-section`: String
- `logo-href`: String
- `site-name`: String

**Events**

- `so-section-select` → wird ausgelöst, wenn ein Bereich (Services/Verwaltung) geklickt wird  
  `detail: { label, href }`

### `<so-breadcrumb>`

**Beispiel**

```html
<so-breadcrumb>
  <so-breadcrumb-item href="https://so.ch">so.ch</so-breadcrumb-item>
  <so-breadcrumb-item href="https://so.ch/verwaltung/">Verwaltung</so-breadcrumb-item>
  <so-breadcrumb-item href="https://so.ch/verwaltung/bau-und-justizdepartement/">Bau- und Justizdepartement</so-breadcrumb-item>
  <so-breadcrumb-item href="https://so.ch/verwaltung/bau-und-justizdepartement/amt-fuer-geoinformation/" isCurrentPage>
    Amt für Geoinformation
  </so-breadcrumb-item>
</so-breadcrumb>
```

**Custom Properties**

- `--so-breadcrumb-padding`: Padding (Default `24px`)

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

> Hinweis: Wenn du `styles/fonts.css` einbindest, wird Frutiger über die mitgelieferten `woff2`-Dateien aus `styles/` geladen.

## Lizenz

MIT (für dieses Beispielprojekt).


### `<so-lead-text>`

Für grössere Intro-Absätze unter einer Seitentitel-Zeile.

**Beispiel**

```html
<h1 class="so-page-title">Kartenkatalog</h1>
<so-lead-text>
  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
  <p>Mit <a href="https://www.cogeo.org/">einem Link</a> im Text.</p>
</so-lead-text>
```

**Custom Properties**

- `--so-lead-text-margin-top` (Default `24px`)
- `--so-lead-text-font-size` (Default `1.125rem`)
- `--so-lead-text-line-height` (Default `1.55`)

### Standard-Linkstyling in `tokens.css`

Ja, das passt gut in `tokens.css` für den globalen Fallback ausserhalb von Shadow-DOM-Komponenten.

- Links sind standardmässig unterstrichen.
- Hover/Focus rendert rot (`#e01f26`).
- Übersteuerbar via CSS-Variablen `--so-link-color` und `--so-link-hover-color`.
