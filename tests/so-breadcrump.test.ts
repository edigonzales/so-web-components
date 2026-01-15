describe("so-breadcrump", () => {
  beforeAll(async () => {
    // @ts-expect-error dist output is generated before tests run.
    await import("../../dist/index.js");
  });

  beforeEach(() => {
    document.body.innerHTML = "";
  });

  test("renders default items and highlights the last entry", () => {
    const el = document.createElement("so-breadcrump");
    document.body.appendChild(el);

    const shadow = (el as HTMLElement).shadowRoot!;
    const items = Array.from(shadow.querySelectorAll(".item"));
    expect(items.length).toBeGreaterThan(1);
    const lastItem = items[items.length - 1];
    expect(lastItem?.classList.contains("current")).toBe(true);
    expect(lastItem?.querySelector("a")).not.toBeNull();
  });

  test("accepts items attribute with label and href objects", () => {
    const el = document.createElement("so-breadcrump");
    el.setAttribute("items", JSON.stringify([
      { label: "Start", href: "/start" },
      { label: "Zwischen", href: "/middle" },
      { label: "Ende", href: "/end" }
    ]));
    document.body.appendChild(el);

    const shadow = (el as HTMLElement).shadowRoot!;
    const labels = Array.from(shadow.querySelectorAll(".item"), (item) => item.textContent?.trim());
    expect(labels).toEqual(expect.arrayContaining(["Start", "Zwischen", "Ende"]));

    const links = Array.from(shadow.querySelectorAll(".item a"));
    expect(links.length).toBe(3);
    expect(links[1].getAttribute("href")).toBe("/middle");
  });

  test("sets 24px padding via styles", () => {
    const el = document.createElement("so-breadcrump");
    document.body.appendChild(el);

    const shadow = (el as HTMLElement).shadowRoot!;
    const style = shadow.querySelector("style")?.textContent ?? "";
    expect(style).toContain("padding: var(--so-breadcrump-padding, 24px)");
  });
});
