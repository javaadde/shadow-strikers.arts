import { describe, expect, it } from "vitest";
import { branchPlace, content } from "./index";

describe("branchPlace", () => {
  it("prefixes the locality when there is one", () => {
    expect(branchPlace({ name: "Manjeri", locality: "Pullur" })).toBe(
      "Pullur, Manjeri"
    );
  });

  it("falls back to the town name", () => {
    expect(branchPlace({ name: "Cholackkal" })).toBe("Cholackkal");
  });

  it("matches the content for both branches", () => {
    expect(content.branches.map(branchPlace)).toEqual([
      "Pullur, Manjeri",
      "Cholackkal",
    ]);
  });
});
