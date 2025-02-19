export interface SessionDto {
  uniqueId: string;
  description: string;
  startTime: string;
  playerMappings: Record<number, SessionPlayerDto>;
  sessionPlan: SessionPlanDto;
}

export interface SessionPlayerDto {
  uniqueId: string;
  displayName: string;
}

export interface SessionPlanDto {
  tables: string[];
  gameStructure: GameStructureDto;
}

export interface GameStructureDto {
  rounds: RoundDto[];
}

export interface RoundDto {
  games: PlannedGameDto[];
  freePlayers: number[];
}

export interface PlannedGameDto {
  table: number;
  participants: ParticipantsDto<number>;
}

export type ParticipantsDto<T> = T[][];
