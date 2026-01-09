describe("so-header", () => {
  beforeAll(async () => {
    // @ts-expect-error dist output is generated before tests run.
    await import("../../dist/index.js");
  });

  beforeEach(() => {
    document.body.innerHTML = "";
  });

  test("renders svg logo + section nav without search form", () => {
    const el = document.createElement("so-header");
    document.body.appendChild(el);

    const shadow = (el as HTMLElement).shadowRoot!;
    expect(shadow.querySelector("svg#logo")).not.toBeNull();
    expect(shadow.querySelector("form.search")).toBeNull();

    const sectionLinks = Array.from(shadow.querySelectorAll(".sectionnav a")).map(a => a.textContent?.trim());
    expect(sectionLinks).toEqual(expect.arrayContaining(["Services", "Verwaltung"]));
  });

  test("accepts JSON nav via attributes", () => {
    const el = document.createElement("so-header");
    el.setAttribute("top-nav", JSON.stringify([
      { label: "Foo", href: "/foo" },
      { label: "my.so.ch", href: "/my" }
    ]));
    el.setAttribute("section-nav", JSON.stringify([{ label: "Bar", href: "/bar" }]));
    document.body.appendChild(el);

    const shadow = (el as HTMLElement).shadowRoot!;
    const topLinks = Array.from(shadow.querySelectorAll(".topnav a")).map((a) => {
      const label = a.querySelector("span")?.textContent?.trim();
      return label ?? a.textContent?.trim();
    });
    expect(topLinks).toEqual(["Foo", "my.so.ch"]);
    expect(shadow.querySelector(".topnav a .icon")).not.toBeNull();
    const sectionLinks = Array.from(shadow.querySelectorAll(".sectionnav a")).map(a => a.textContent?.trim());
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

  test("styles set default colors and hover red", () => {
    const el = document.createElement("so-header");
    document.body.appendChild(el);

    const shadow = (el as HTMLElement).shadowRoot!;
    const style = shadow.querySelector("style")?.textContent ?? "";
    expect(style).toContain("background: var(--so-bg, #fff)");
    expect(style).toContain("color: var(--so-fg, rgb(47, 72, 88))");
    expect(style).toContain("color: rgb(204, 0, 0)");
  });
});
