export interface Player {
  name: string;
  score: number;
  rank: number;
}

export interface PlayerData {
  [name: string]: number;
}
