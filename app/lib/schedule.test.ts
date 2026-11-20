import { describe, expect, it } from "vitest";
import { formatTime, groupByDay } from "./schedule";

describe("schedule", () => {
  it("groups by day in week order and sorts by start time", () => {
    const grouped = groupByDay([
      { day: "sat", start: "09:00", end: "10:00", programId: "a" },
      { day: "mon", start: "18:00", end: "19:00", programId: "b" },
      { day: "mon", start: "07:00", end: "08:00", programId: "c" },
    ]);
    expect(grouped.map((g) => g.day)).toEqual(["mon", "sat"]);
    expect(grouped[0].sessions.map((s) => s.programId)).toEqual(["c", "b"]);
  });

  it("formats 24h times as 12h", () => {
    expect(formatTime("00:05")).toBe("12:05 am");
    expect(formatTime("12:00")).toBe("12:00 pm");
    expect(formatTime("18:30")).toBe("6:30 pm");
  });
});
