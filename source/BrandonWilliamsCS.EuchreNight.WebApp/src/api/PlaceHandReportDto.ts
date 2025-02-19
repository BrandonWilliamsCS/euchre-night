export interface PlaceHandReportDto {
  sessionId: string;
  roundNumber: number;
  tableNumber: number;
  handNumber: number;
  callingPlayerNumber: number;
  callerWentAlone: boolean;
  winningPlayerNumbers: number[];
  winnersTookAllTricks: boolean;
}
