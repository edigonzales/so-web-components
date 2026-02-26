describe("so-lead-text", () => {
  beforeAll(async () => {
    // @ts-expect-error dist output is generated before tests run.
    await import("../../dist/index.js");
  });

  beforeEach(() => {
    document.body.innerHTML = "";
  });

  test("renders slotted paragraphs", () => {
    document.body.innerHTML = `
      <so-lead-text>
        <p>Erster Absatz.</p>
        <p>Zweiter Absatz mit <a href="/link">Link</a>.</p>
      </so-lead-text>
    `;

    const el = document.querySelector("so-lead-text") as HTMLElement;
    const shadow = el.shadowRoot;

    expect(shadow).not.toBeNull();
    expect(el.querySelectorAll("p")).toHaveLength(2);
    expect(shadow?.querySelector("slot")).not.toBeNull();
  });

  test("uses expected default lead text styles", () => {
    const el = document.createElement("so-lead-text");
    document.body.appendChild(el);

    const shadow = el.shadowRoot!;
    const style = shadow.querySelector("style")?.textContent ?? "";

    expect(style).toContain("margin-top: var(--so-lead-text-margin-top, 24px)");
    expect(style).toContain("font-size: var(--so-lead-text-font-size, 1.125rem)");
    expect(style).toContain("line-height: var(--so-lead-text-line-height, 1.55)");
    expect(style).toContain("margin: 0 0 18px");
  });
});
