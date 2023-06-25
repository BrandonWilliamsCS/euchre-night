import { Player } from "./Player";

export interface Bid {
  callingPlayer: Player;
  suit: string;
  wentAlone: boolean;
}
