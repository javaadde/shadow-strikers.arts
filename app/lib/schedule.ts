import { days, type Branch, type Day } from "./content/schema";

export const dayLabels: Record<Day, string> = {
  mon: "Monday",
  tue: "Tuesday",
  wed: "Wednesday",
  thu: "Thursday",
  fri: "Friday",
  sat: "Saturday",
  sun: "Sunday",
};

/** Sessions grouped by day in week order, each day sorted by start time. Empty days are dropped. */
export function groupByDay(schedule: Branch["schedule"]) {
  return days
    .map((day) => ({
      day,
      sessions: schedule
        .filter((session) => session.day === day)
        .sort((a, b) => a.start.localeCompare(b.start)),
    }))
    .filter((group) => group.sessions.length > 0);
}

/** "18:30" -> "6:30 pm" */
export function formatTime(time: string) {
  const [h, m] = time.split(":").map(Number);
  const suffix = h < 12 ? "am" : "pm";
  const hour = h % 12 === 0 ? 12 : h % 12;
  return `${hour}:${String(m).padStart(2, "0")} ${suffix}`;
}
