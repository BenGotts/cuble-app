import { ApiPerson } from "@/types";

export function getBestRank({ personal_records }: ApiPerson): number | null {
  let bestRank = Infinity;

  for (const event in personal_records) {
    const { single: { world_rank: singleRank }, average: { world_rank: averageRank } = {} } = personal_records[event];
    if (singleRank === 1 || averageRank === 1) return 1;
    
    bestRank = Math.min(bestRank, singleRank, averageRank || Infinity);
  }

  return bestRank === Infinity ? null : bestRank;
}

export function getTotalTop100Ranks({ personal_records }: ApiPerson): number {
  let top100Count = 0;

  for (const event in personal_records) {
    const { single: { world_rank: singleRank }, average: { world_rank: averageRank } = {} } = personal_records[event];
    if (singleRank <= 100 && singleRank !== 1) top100Count++;
    if ((averageRank || Infinity) <= 100 && averageRank !== 1) top100Count++;
  }

  return top100Count;
}