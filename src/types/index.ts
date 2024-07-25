import { Avatar, WcaId } from "@wca/helpers"

export interface PersonalRecord {
  best: number,
  world_rank: number,
  continent_rank: number,
  country_rank: number,
}

export interface Person {
  name: string,
  wca_id: WcaId,
  avatar: Avatar,
  gender: "m" | "f" | "o",
  country_iso2: string,
  url: string,
  country: {
    id: string,
    name: string,
    continentId: string,
    iso2: string
  },
  delegate_status: string,
  class: string,
  teams: any[],
  id: WcaId
}

export interface ApiPerson {
  person: Person,
  competition_count: number,
  personal_records: {
    [event_id: string]: {
      single: PersonalRecord,
      average?: PersonalRecord,
    },
  },
  medals: {
    gold: number,
    silver: number,
    bronze: number,
    total: number
  },
  records: {
    national: number,
    continental: number,
    world: number,
    total: number
  }
}

export interface Event {
  "event_id": string,
  "worldRank": number,
  "continentRank": number,
  "countryRank": number,
  "best": number,
  "event_type": string,
}

export interface WCAPerson {
  "wcaId": WcaId,
  "name": string,
  "country": {
    "id": string,
    "continentId": string,
    "iso2": string,
    "name": string,
  },
  "events": Event[],
}