import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatPrice(cents: number | null): string {
  if (cents === null) return "Op aanvraag"
  return `€${(cents / 100).toLocaleString('nl-NL', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`
}

export function formatPriceDetailed(cents: number | null): string {
  if (cents === null) return "Op aanvraag"
  return `€${(cents / 100).toLocaleString('nl-NL', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
}
