import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const notAvailableString = "-";

export function formatDate(dateString?: string) {
  return dateString
    ? new Date(dateString).toLocaleDateString("nl-NL", {
        day: "numeric",
        month: "short",
        year: "numeric",
      })
    : "onbekend";
}

export function formatKg(toFormat?: string) {
  if (toFormat == null) {
    return notAvailableString;
  }
  const number = parseFloat(toFormat);
  if (isNaN(number)) {
    return toFormat + " kg";
  }

  return new Intl.NumberFormat("nl-NL", {
    style: "unit",
    unit: "kilogram",
  }).format(number);
}

export function formatMeters(toFormat?: string) {
  if (toFormat == null) {
    return notAvailableString;
  }

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

export function requiredEnv(key: string): string {
  const value = process.env[key];
  if (value === undefined) {
    throw new Error(`Missing required environment variable: ${key}`);
  }
  return value;
}
