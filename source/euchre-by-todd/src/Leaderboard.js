import React, {useReducer} from "react";
import { appReducer } from "./utils/appReducer";

//The downside to this approach is the Player Scores don't get submitted until the player clicks "Game Over"
//but the other stats (loners, euchres, and quarters) get sent automatically.
//If we want to send them all at once, add stat-tracking in the reducer, then bundle them to send together at Game Over.


const Leaderboard = ({state}) => {
    console.log("%c LEADERBOARD.JS", "background: purple; color:black");

    // //put high scores on top
    // const highScores = state.playerList.sort((a,b) => a.score - b.score).reverse();
    //have to make the object an array...
    const highScores = Object.keys(state.playerList).map((key) => state.playerList[key]).sort((a,b) => a.score - b.score).reverse();

    return(<div className="leaderboard">
      <ol>
        {highScores?.map((item,i) => {
            return (
              <div className="line" key={i}>
                <li> 
                <p className="emph"><strong>{item.name} - {item.score}</strong></p>
                <p>{item.loners} loners, {item.euchres} euchres, {item.quartersOwed} quarters paid</p>
                </li>
            
              </div>)
        }
        )}
      </ol>
  </div>);
  };

  export default Leaderboard;