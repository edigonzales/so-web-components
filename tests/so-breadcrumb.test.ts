describe("so-breadcrumb", () => {
  beforeAll(async () => {
    // @ts-expect-error dist output is generated before tests run.
    await import("../../dist/index.js");
  });

  beforeEach(() => {
    document.body.innerHTML = "";
  });

  test("renders breadcrumb items from nested elements and highlights current page", () => {
    document.body.innerHTML = `
      <so-breadcrumb>
        <so-breadcrumb-item href="/dashboard">Dashboard</so-breadcrumb-item>
        <so-breadcrumb-item href="/reports">Annual reports</so-breadcrumb-item>
        <so-breadcrumb-item href="/reports/2019" isCurrentPage>2019</so-breadcrumb-item>
      </so-breadcrumb>
    `;

    const el = document.querySelector("so-breadcrumb") as HTMLElement;
    const shadow = el.shadowRoot!;
    const items = Array.from(shadow.querySelectorAll(".item"));
    expect(items.length).toBe(3);

    const current = shadow.querySelector(".item.current");
    expect(current).not.toBeNull();
    expect(current?.textContent).toContain("2019");
    expect(current?.querySelector("[aria-current=\"page\"]")).not.toBeNull();
  });

  test("defaults the last item to current when none is marked", () => {
    document.body.innerHTML = `
      <so-breadcrumb>
        <so-breadcrumb-item href="/dashboard">Dashboard</so-breadcrumb-item>
        <so-breadcrumb-item href="/reports">Annual reports</so-breadcrumb-item>
      </so-breadcrumb>
    `;

    const el = document.querySelector("so-breadcrumb") as HTMLElement;
    const shadow = el.shadowRoot!;
    const items = Array.from(shadow.querySelectorAll(".item"));
    const lastItem = items[items.length - 1];
    expect(lastItem?.classList.contains("current")).toBe(true);
  });

  test("sets 24px padding via styles", () => {
    const el = document.createElement("so-breadcrumb");
    document.body.appendChild(el);

    const shadow = (el as HTMLElement).shadowRoot!;
    const style = shadow.querySelector("style")?.textContent ?? "";
    expect(style).toContain("padding: var(--so-breadcrumb-padding, 24px)");
  });
});
