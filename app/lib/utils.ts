import { ClassValue, clsx } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";
import { layers } from "./design-tokens";

const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      z: [{ z: Object.keys(layers) }],
    },
  },
});

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
