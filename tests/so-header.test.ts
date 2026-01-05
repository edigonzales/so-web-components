import { JSDOM } from "jsdom";

function installDom(): void {
  const dom = new JSDOM(`<!doctype html><html><body></body></html>`, { url: "http://localhost/" });
  (globalThis as unknown as { window: Window }).window = dom.window as unknown as Window;
  (globalThis as unknown as { document: Document }).document = dom.window.document;
  (globalThis as unknown as { HTMLElement: typeof HTMLElement }).HTMLElement = dom.window.HTMLElement;
  (globalThis as unknown as { customElements: CustomElementRegistry }).customElements = dom.window.customElements;
  (globalThis as unknown as { CustomEvent: typeof CustomEvent }).CustomEvent = dom.window.CustomEvent;
}

describe("so-header", () => {
  beforeEach(async () => {
    installDom();
    await import("../dist/index.js");
  });

  test("renders svg logo + search form + section nav", () => {
    const el = document.createElement("so-header");
    document.body.appendChild(el);

    const shadow = (el as HTMLElement).shadowRoot!;
    expect(shadow.querySelector("svg#logo")).not.toBeNull();
    expect(shadow.querySelector("form.search input[type='search']")).not.toBeNull();

    const sectionLinks = [...shadow.querySelectorAll(".sectionnav a")].map(a => a.textContent?.trim());
    expect(sectionLinks).toEqual(expect.arrayContaining(["Services", "Verwaltung"]));
  });

  test("accepts JSON nav via attributes", () => {
    const el = document.createElement("so-header");
    el.setAttribute("top-nav", JSON.stringify([{ label: "Foo", href: "/foo" }]));
    el.setAttribute("section-nav", JSON.stringify([{ label: "Bar", href: "/bar" }]));
    document.body.appendChild(el);

    const shadow = (el as HTMLElement).shadowRoot!;
    const topLinks = [...shadow.querySelectorAll(".topnav a")].map(a => a.textContent?.trim());
    expect(topLinks).toEqual(["Foo"]);
    const sectionLinks = [...shadow.querySelectorAll(".sectionnav a")].map(a => a.textContent?.trim());
    expect(sectionLinks).toEqual(["Bar"]);
  });

  test("toggle menu toggles aria-expanded and panel state", () => {
    const el = document.createElement("so-header");
    document.body.appendChild(el);

    const shadow = (el as HTMLElement).shadowRoot!;
    const btn = shadow.querySelector("button[data-action='toggle-menu']") as HTMLButtonElement;
    const panel = shadow.querySelector(".mobile-panel-inner") as HTMLDivElement;

    expect(btn.getAttribute("aria-expanded")).toBe("false");
    expect(panel.getAttribute("data-open")).toBe("false");

    btn.click();
    expect(btn.getAttribute("aria-expanded")).toBe("true");
    expect(panel.getAttribute("data-open")).toBe("true");
  });
});
