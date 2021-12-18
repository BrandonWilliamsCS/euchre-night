import { Bid } from "./Bid";

//!! good name? could call it HandResult or HandOutcome. But, it is the culmination of the entire hand.
// Should the hand "have" the round, table, etc. in it?
// +entire, self-contained statistics that way
// -no longer a standalone value type
export interface Hand {
  bid: Bid;
  callerTricksTaken: "all" | "majority" | "minority";
}
