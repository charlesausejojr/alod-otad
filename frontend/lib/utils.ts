import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function convertSteam64ToSteam32(steam64Id: string | number): number {
  const STEAM64_OFFSET = 76561197960265728n; // Offset for Steam64 to Steam32 conversion
  const steam64BigInt = BigInt(steam64Id); // Convert to BigInt for large number handling

  if (steam64BigInt < STEAM64_OFFSET) {
    throw new Error('Invalid Steam64 ID');
  }

  return Number(steam64BigInt - STEAM64_OFFSET);
}
