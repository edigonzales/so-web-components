import { readFileSync } from "fs";

describe("tokens.css", () => {
  test("defines global default link styles", () => {
    const css = readFileSync("dist/styles/tokens.css", "utf8");

    expect(css).toContain("--so-link-color: inherit");
    expect(css).toContain("--so-link-hover-color: #e01f26");
    expect(css).toContain("a{");
    expect(css).toContain("text-decoration: underline");
    expect(css).toContain("a:hover");
    expect(css).toContain("a:focus-visible");
    expect(css).toContain("color: var(--so-link-hover-color)");
  });
});
