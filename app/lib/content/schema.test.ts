import { describe, expect, it } from "vitest";
import raw from "../../../data/academy.json";
import { academySchema, parseAcademy } from "./schema";

const base = () => structuredClone(raw) as Record<string, unknown> & typeof raw;

describe("academy content", () => {
  it("data/academy.json is valid", () => {
    expect(() => parseAcademy(raw)).not.toThrow();
  });

  it("has both branches", () => {
    expect(parseAcademy(raw).branches.map((b) => b.slug)).toEqual([
      "manjeri",
      "cholackkal",
    ]);
  });

  it("rejects a session for an unknown program", () => {
    const data = base();
    (data.branches[0].schedule as unknown[]).push({
      day: "mon",
      start: "18:00",
      end: "19:00",
      programId: "missing",
    });
    expect(academySchema.safeParse(data).success).toBe(false);
  });

  it("rejects a session that ends before it starts", () => {
    const data = base();
    data.programs = [{ id: "kids", name: "Kids", description: "x" }] as never;
    (data.branches[0].schedule as unknown[]).push({
      day: "mon",
      start: "19:00",
      end: "18:00",
      programId: "kids",
    });
    expect(academySchema.safeParse(data).success).toBe(false);
  });

  it("rejects duplicate branch slugs", () => {
    const data = base();
    data.branches = [data.branches[0], data.branches[0]];
    expect(academySchema.safeParse(data).success).toBe(false);
  });

  it("rejects phone numbers that are not plain digits", () => {
    const data = base();
    (data.branches[0] as Record<string, unknown>).phone = "+91 98765 43210";
    expect(academySchema.safeParse(data).success).toBe(false);
  });

  it("has map links and addresses for both branches", () => {
    for (const branch of parseAcademy(raw).branches) {
      expect(branch.mapsUrl).toMatch(/^https:\/\/maps\.app\.goo\.gl\//);
      expect(branch.address).toBeTruthy();
    }
  });

  it("lists the two academy phone numbers", () => {
    expect(parseAcademy(raw).academy.contacts.map((c) => c.phone)).toEqual([
      "917356998167",
      "917034934327",
    ]);
  });
});
