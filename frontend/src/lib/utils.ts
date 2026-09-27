import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatINR(amount: number): string {
  if (amount >= 10000000) {
    return `₹${(amount / 10000000).toFixed(2)} Cr`;
  } else if (amount >= 100000) {
    return `₹${(amount / 100000).toFixed(2)} Lakh`;
  }
  return `₹${amount.toLocaleString("en-IN")}`;
}

export function getUrgencyBadge(urgency: string) {
  switch (urgency?.toUpperCase()) {
    case "CRITICAL":
      return "bg-rose-500/20 text-rose-300 border-rose-500/40";
    case "HIGH":
      return "bg-orange-500/20 text-orange-300 border-orange-500/40";
    case "MODERATE":
      return "bg-amber-500/20 text-amber-300 border-amber-500/40";
    default:
      return "bg-emerald-500/20 text-emerald-300 border-emerald-500/40";
  }
}
