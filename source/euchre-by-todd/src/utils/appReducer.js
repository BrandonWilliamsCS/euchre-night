const INITIAL_STATE = {
  //called with state.[variable]
  modalDisplay:false,
  playerList: [], //player data
  rounds: [], //play schedule
  round: 1,  //current round
    //we might need another solution to manage the differences between tables.
    //Unless, because each table loads its own instance, the reducer isn't pushing the same info?
    //We'd probably need a central DB to push to, and indicate which table the data is coming from.
  table: null, //current table
  trapCard:"", //trap card for current table
  //team details
  team1Score:0,
  team2Score:0,
  team1Quarters:0,
  team2Quarters:0,
  t1p1: [], //team 1 player 1
  t1p2: [], //team 1 player 2
  t2p1: [], //team 2 player 1
  t2p2: [], //team 2 player 2
  test: [],
};
export function appReducer(state, action) {
  return { ...state, ...action };
}
appReducer.INITIAL_STATE = INITIAL_STATE;