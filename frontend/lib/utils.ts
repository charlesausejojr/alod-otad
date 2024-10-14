import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { Match, PeerStats, HeroStats, Hero, TopHero, FilteredMatch } from "@/lib/types"

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

export function getTopHeroes ( heroData : Hero[],  heroStats : HeroStats[]) : TopHero[] {
  return heroData
    .sort((a, b) => b.win - a.win) // Sort by win in descending order
    .slice(0, 5) // Get the top 5 heroes
    .map((hero) => {
      const percentage = hero.games > 0 ? (hero.win / hero.games) * 100 : 0; // Calculate win percentage
      const matchingHero = heroStats.find((h) => h.id === hero.hero_id);
      return {
        name: matchingHero?.localized_name ?? "",
        percentage: percentage,
        src: `http://cdn.dota2.com${matchingHero?.img}`
      }
    })
    .sort((a, b) => b.percentage - a.percentage);
}

export function getModifiedRecentMatches ( recentMatches : Match[], heroStats : HeroStats[]) : FilteredMatch[] {
  return recentMatches
    .map((hero) => {
      const matchingHero = heroStats.find((h) => h.id === hero.hero_id);
      return {
        ...hero,
        hero_name: matchingHero?.localized_name ?? "",
        src: `http://cdn.dota2.com${matchingHero?.img}`
      }
  });
}

export function getTopPeers ( peers : PeerStats[]) {
  return peers
    .sort((a, b) => b.with_win - a.with_win) // Sort using number of wins
    .slice(0, 5)
    .map(item => {
      const percentage = (item.with_games > 0) ? (item.with_win / item.with_games) * 100 : 0; // Calculate percentage
      return {
        name: item.personaname,
        percentage: percentage,
        src: item.avatarfull,
      }})
    .sort((a, b) => b.percentage - a.percentage);
}