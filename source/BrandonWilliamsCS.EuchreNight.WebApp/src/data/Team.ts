import { Player } from "./Player";

export class Team {
  public constructor(public readonly players: ReadonlyArray<Player>) {}

  public hasPlayer(player: Player) {
    return this.players.includes(player);
  }
}
