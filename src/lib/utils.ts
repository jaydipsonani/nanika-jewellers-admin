import { type ClassValue } from "clsx"; // We are removing clsx too, need to fix this type

export function cn(...inputs: (string | undefined | null | false)[]) {
  return inputs.filter(Boolean).join(" ");
}
