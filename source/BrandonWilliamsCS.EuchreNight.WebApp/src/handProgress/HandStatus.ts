import { Player } from "data/Player";
import { Team } from "data/Team";

export type HandStatus =
  | InitialHandStatus
  | SelectingTrumpHandStatus
  | SelectingCallerHandStatus
  | SelectingApproachHandStatus
  | PlayingHandStatus
  | SelectingWinnerHandStatus
  | SelectingScoreHandStatus
  | CompleteHandStatus;

export interface InitialHandStatus {
  status: "initital";
}

export interface SelectingTrumpHandStatus {
  status: "selectingTrump";
}

export interface SelectingCallerHandStatus {
  status: "selectingCaller";
  trump: string;
}

export interface SelectingApproachHandStatus {
  status: "selectingApproach";
  trump: string;
  caller: Player;
}

export interface PlayingHandStatus {
  status: "playing";
  trump: string;
  caller: Player;
  wentAlone: boolean;
}

export interface SelectingWinnerHandStatus {
  status: "selectingWinner";
  trump: string;
  caller: Player;
  wentAlone: boolean;
}

export interface SelectingScoreHandStatus {
  status: "selectingScore";
  trump: string;
  caller: Player;
  wentAlone: boolean;
  winner: Team;
}

export interface CompleteHandStatus {
  status: "complete";
  trump: string;
  caller: Player;
  wentAlone: boolean;
  winner: Team;
  wonAllTricks: boolean;
}
