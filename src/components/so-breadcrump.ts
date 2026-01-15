type BreadcrumpItem = { label: string; href: string };

const DEFAULT_ITEMS: BreadcrumpItem[] = [
  { label: "so.ch", href: "https://so.ch" },
  { label: "Verwaltung", href: "https://so.ch/verwaltung/" },
  { label: "Bau- und Justizdepartement", href: "https://so.ch/verwaltung/bau-und-justizdepartement/" },
  { label: "Amt für Geoinformation", href: "https://so.ch/verwaltung/bau-und-justizdepartement/amt-fuer-geoinformation/" }
];

const CHEVRON_SVG = `<svg class="chevron" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
  <path d="m15.53 11.47-6-6c-.29-.29-.77-.29-1.06 0s-.29.77 0 1.06L13.94 12l-5.47 5.47c-.29.29-.29.77 0 1.06.15.15.34.22.53.22s.38-.07.53-.22l6-6c.29-.29.29-.77 0-1.06Z"/>
</svg>`;

function safeParseItems(json: string | null, fallback: BreadcrumpItem[]): BreadcrumpItem[] {
  if (!json) return fallback;
  try {
    const v = JSON.parse(json) as unknown;
    if (!Array.isArray(v)) return fallback;
    const items: BreadcrumpItem[] = [];
    for (const it of v) {
      if (!it || typeof it !== "object") continue;
      const record = it as Record<string, unknown>;
      const label = record["label"];
      const href = record["href"];
      if (typeof label === "string" && typeof href === "string") {
        items.push({ label, href });
      }
    }
    return items.length ? items : fallback;
  } catch {
    return fallback;
  }
}

function el<K extends keyof HTMLElementTagNameMap>(tag: K, cls?: string): HTMLElementTagNameMap[K] {
  const n = document.createElement(tag);
  if (cls) n.className = cls;
  return n;
}

export class SoBreadcrump extends HTMLElement {
  static observedAttributes = ["items"];

  private root: ShadowRoot;
  private items: BreadcrumpItem[] = DEFAULT_ITEMS;

  constructor() {
    super();
    this.root = this.attachShadow({ mode: "open" });
    this.updateFromAttributes();
    this.render();
  }

  attributeChangedCallback(): void {
    this.updateFromAttributes();
    this.render();
  }

  private updateFromAttributes(): void {
    this.items = safeParseItems(this.getAttribute("items"), DEFAULT_ITEMS);
  }

  private render(): void {
    this.root.innerHTML = "";

    const styleEl = document.createElement("style");
    styleEl.textContent = this.styles();
    this.root.appendChild(styleEl);

    const wrapper = el("nav", "so-breadcrump");
    wrapper.setAttribute("aria-label", "Breadcrumb");

    const container = el("div", "so-breadcrump-container");
    const list = el("ol", "list");

    this.items.forEach((item, index) => {
      const isLast = index === this.items.length - 1;
      const li = el("li", "item");
      if (isLast) li.classList.add("current");

      const labelEl = el("a") as HTMLAnchorElement;
      labelEl.href = item.href;
      labelEl.textContent = item.label;

      li.appendChild(labelEl);

      if (!isLast) {
        li.insertAdjacentHTML("beforeend", CHEVRON_SVG);
      }

      list.appendChild(li);
    });

    container.appendChild(list);
    wrapper.appendChild(container);
    this.root.appendChild(wrapper);
  }

  private styles(): string {
    return `
      :host{
        display: block;
        width: 100%;
        font-family: var(--so-font-family, Frutiger, sans-serif);
      }

      .so-breadcrump{
        width: 100%;
        color: var(--so-fg, rgb(47, 72, 88));
      }

      .so-breadcrump-container{
        width: 100%;
        padding: var(--so-breadcrump-padding, 24px);
      }

      .list{
        list-style: none;
        display: flex;
        flex-wrap: wrap;
        align-items: flex-end;
        gap: 0.5rem;
        padding: 0;
        margin: 0;
        font-size: 14px;
        line-height: 1.4;
      }

      .item{
        display: inline-flex;
        align-items: flex-end;
        gap: 0.5rem;
        color: inherit;
      }

      .item a{
        color: inherit;
        text-decoration: none;
        line-height: 1;
      }

      .item a:hover,
      .item a:focus-visible{
        color: #e01f26;
        text-decoration: none;
      }

      .item.current,
      .item.current a{
        color: #e01f26;
      }

      .chevron{
        width: 21px;
        height: 21px;
        fill: #e01f26;
        flex: 0 0 auto;
        display: block;
      }
    `;
  }
}
