export interface Player {
  name: string;
  score: number;
  rank: number;
  timestamp: number;
}

export interface ScoreHistory {
  score: number;
  timestamp: number;
}

export interface PlayerData {
  [name: string]: {
    score: number;
    timestamp: number;
    history: ScoreHistory[];
  };
}
