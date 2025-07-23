import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const notAvailableString = "-";

export function formatDate(dateString: string | null) {
  return dateString
    ? new Date(dateString).toLocaleDateString("nl-NL", {
        day: "numeric",
        month: "short",
        year: "numeric",
      })
    : "onbekend";
}

export function formatKg(toFormat: string) {
  const number = parseFloat(toFormat);
  if (isNaN(number)) {
    return toFormat + " kg";
  }

  return new Intl.NumberFormat("nl-NL", {
    style: "unit",
    unit: "kilogram",
  }).format(number);
}

export function formatMeters(toFormat: string) {
  const number = parseFloat(toFormat);
  if (isNaN(number)) {
    return toFormat + " meters";
  }

  return new Intl.NumberFormat("nl-NL", {
    style: "unit",
    unit: "meter",
  }).format(number);
}

export function titleToId(title: string) {
  return title
    .replace(/\s+/g, "-")
    .replace(/[^\w\-]/g, "")
    .toLowerCase();
}
