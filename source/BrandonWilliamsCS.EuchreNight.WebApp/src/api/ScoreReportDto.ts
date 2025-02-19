export interface ScoreReportDto {
  uniqueId: string;
  sessionId: string;
  games: ScoreReportGameDto[];
}

export interface ScoreReportGameDto {
  roundNumber: number;
  tableNumber: number;
  gameOutcome: GameOutcomeDto;
}

export interface GameOutcomeDto {
  hands: HandOutcomeDto;
  playerScores: Record<number, GamePlayerScoreDto>;
}

export interface GamePlayerScoreDto {
  win: boolean;
  handsWon: number;
  points: number;
  euchres: number;
  lonersAttempted: number;
  lonersWon: number;
}

export interface HandOutcomeDto {
  playerScores: Record<number, HandPlayerScoreDto>;
}

export interface HandPlayerScoreDto {
  win: boolean;
  points: number;
  euchres: number;
  lonersAttempted: number;
  lonersWon: number;
}
