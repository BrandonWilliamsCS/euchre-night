import React, { useEffect, useReducer, useRef, useState } from 'react';
import GameDetails from './GameDetails';
import RoundDetails from './RoundDetails';
import Leaderboard from './Leaderboard';
import PlaySchedule from './PlaySchedule';
import { appReducer } from './utils/appReducer';
import { historyReducer } from './utils/historyReducer';
import { ApiService } from './api/ApiService';

//Add tonight's players here
//12 players, everyone plays every round.
//13 players, one will have a by-round.
const playersTonight = [
  //Schedules set up for 12 and 13 players. Any more or fewer, we will need a new schedule.
/* 0 */  "",
/* 1 */  "Todd",
/* 2 */  "Brandon",
/* 3 */  "Heather",
/* 4 */  "Maria",
/* 5 */  "Bob",
/* 6 */  "Tony",
/* 7 */  "Jose",
/* 8 */  "Ed",
/* 9 */  "Jackie",
/* 10 */  "Hayley",
/* 11 */  "Jim",
/* 12 */  "Carol",
/* 13 */  "Sue",
];

//randomize the indeces of an array
function shuffle(array) {
  //filter out blanks
  let filteredArray = array.filter(function(el){
    return el != ""; 
  });
  let currentIndex = filteredArray.length;
  // While there remain elements to shuffle...
  while (currentIndex != 0) {
    // Pick a remaining element...
    let randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    // And swap it with the current element.
    [filteredArray[currentIndex], filteredArray[randomIndex]] = [
      filteredArray[randomIndex], filteredArray[currentIndex]];
  }

  return(filteredArray);
}

    
    //--------------------------
    //APP JS
    //--------------------------
    
    
const App = () => {
  console.log("%c APP.JS", "background: purple; color:black");
  const apiServiceRef = useRef(new ApiService('https://localhost:7237'));
  
  //Set up reducer for state management
  const [state, dispatch] = useReducer(appReducer, appReducer.INITIAL_STATE);
  //Set up reducer for "Undo" functionality
  const [history, updateHistory] = useReducer(historyReducer, historyReducer.INITIAL_HISTORY);
  const [session, setSession] = useState();

  //Set up URL queries
  const queryParameters = new URLSearchParams(window.location.search);

  
  //set up player objects
  useEffect(async () => {
    // make current session API call
    setSession(await apiServiceRef.current.getCurrentSession());

    //---- SET CURRENT TABLE
    // log it as a number so we can use the switch statement.
    state.table = Number(queryParameters.get("table"))

    
    //---- SET PAGE TITLE
    if(state.table === null || state.table > 3 || state.table === 0){
      document.title = `Euchre Leaderboard`;
      setDisp(0);
    } else {
      document.title = `Euchre Table ${state.table}`;
      setDisp(1);
    }
    switch(state.table){
      case 1: 
        state.trapCard="K ♥️";
        break;
      case 2: 
        state.trapCard="Q ♥️";
        break;
      case 3: 
        state.trapCard="J ♥️";
        break;
      default: 
      state.trapCard="No trap card";
    }


  
    //----SET UP THE PLAY SCHEDULE
    //----------------------------- 
      //dispatch 13 players
      dispatch({
        rounds : [
          { //1
            table1: {
              team1: [5,6],
              team2: [4,10],
            },
            table2: {
              team1: [7,9],
              team2: [12,3],
            },
            table3: {
              team1: [11,1],
              team2: [8,0],
            },
          },
          { //2
            table1: {
              team1: [6,7],
              team2: [5,11],
            },
            table2: {
              team1: [8,10],
              team2: [0,4],
            },
            table3: {
              team1: [12,2],
              team2: [9,1],
            },
          },
          { //3
            table1: {
              team1: [7,8],
              team2: [6,12],
            },
            table2: {
              team1: [9,11],
              team2: [1,5],
            },
            table3: {
              team1: [0,3],
              team2: [10,2],
            },
          },
          { //4
            table1: {
              team1: [9,8],
              team2: [7,0],
            },
            table2: {
              team1: [10,12],
              team2: [2,6],
            },
            table3: {
              team1: [1,4],
              team2: [11,3],
            },
          },
          { //5
            table1: {
              team1: [9,10],
              team2: [8,1],
            },
            table2: {
              team1: [11,0],
              team2: [3,7],
            },
            table3: {
              team1: [2,5],
              team2: [12,4],
            },
          },
          { //6
            table1: {
              team1: [10,11],
              team2: [9,2],
            },
            table2: {
              team1: [12,1],
              team2: [4,8],
            },
            table3: {
              team1: [6,3],
              team2: [0,5],
            },
          },
          { //7
            table1: {
              team1: [11,12],
              team2: [10,3],
            },
            table2: {
              team1: [0,2],
              team2: [5,9],
            },
            table3: {
              team1: [4,7],
              team2: [1,6],
            },
          },
          { //8
            table1: {
              team1: [12,0],
              team2: [11,4],
            },
            table2: {
              team1: [1,3],
              team2: [6,10],
            },
            table3: {
              team1: [5,8],
              team2: [2,7],
            },
          },
          { //9
            table1: {
              team1: [0,1],
              team2: [5,12],
            },
            table2: {
              team1: [2,4],
              team2: [7,11],
            },
            table3: {
              team1: [6,9],
              team2: [3,8],
            },
          },
          { //10
            table1: {
              team1: [1,2],
              team2: [0,6],
            },
            table2: {
              team1: [3,5],
              team2: [8,12],
            },
            table3: {
              team1: [7,10],
              team2: [4,9],
            },
          },
          { //11
            table1: {
              team1: [2,3],
              team2: [1,7],
            },
            table2: {
              team1: [4,6],
              team2: [9,0],
            },
            table3: {
              team1: [8,11],
              team2: [10,5],
            },
          },
          { //12
            table1: {
              team1: [3,4],
              team2: [2,8],
            },
            table2: {
              team1: [5,7],
              team2: [1,10],
            },
            table3: {
              team1: [9,12],
              team2: [6,11],
            },
          },
          { //13
            table1: {
              team1: [4,5],
              team2: [3,9],
            },
            table2: {
              team1: [6,8],
              team2: [11,2],
            },
            table3: {
              team1: [10,0],
              team2: [7,12],
            },
          },
        ]
      });

      //dispatch 12 players
  // dispatch({
  //   rounds : [
  //     { //1
  //       table1: {
  //         team1: [1,2],
  //         team2: [7,11],
  //       },
  //       table2: {
  //         team1: [4,5],
  //         team2: [3,8],
  //       },
  //       table3: {
  //         team1: [6,9],
  //         team2: [10,0],
  //       },
  //     },
  //     { //2
  //       table1: {
  //         team1: [1,3],
  //         team2: [6,0],
  //       },
  //       table2: {
  //         team1: [5,6],
  //         team2: [4,9],
  //       },
  //       table3: {
  //         team1: [7,10],
  //         team2: [11,2],
  //       },
  //     },
  //     { //3
  //       table1: {
  //         team1: [1,4],
  //         team2: [9,2],
  //       },
  //       table2: {
  //         team1: [6,7],
  //         team2: [10,5],
  //       },
  //       table3: {
  //         team1: [8,11],
  //         team2: [0,3],
  //       },
  //     },
  //     { //4
  //       table1: {
  //         team1: [1,5],
  //         team2: [10,3],
  //       },
  //       table2: {
  //         team1: [7,8],
  //         team2: [11,6],
  //       },
  //       table3: {
  //         team1: [9,0],
  //         team2: [2,4],
  //       },
  //     },
  //     { //5
  //       table1: {
  //         team1: [1,6],
  //         team2: [11,4],
  //       },
  //       table2: {
  //         team1: [8,9],
  //         team2: [7,0],
  //       },
  //       table3: {
  //         team1: [2,10],
  //         team2: [3,5],
  //       },
  //     },
  //     { //6
  //       table1: {
  //         team1: [1,7],
  //         team2: [0,5],
  //       },
  //       table2: {
  //         team1: [9,10],
  //         team2: [2,8],
  //       },
  //       table3: {
  //         team1: [11,3],
  //         team2: [4,6],
  //       },
  //     },
  //     { //7
  //       table1: {
  //         team1: [1,8],
  //         team2: [2,6],
  //       },
  //       table2: {
  //         team1: [10,11],
  //         team2: [3,9],
  //       },
  //       table3: {
  //         team1: [0,4],
  //         team2: [5,7],
  //       },
  //     },
  //     { //8
  //       table1: {
  //         team1: [1,9],
  //         team2: [3,7],
  //       },
  //       table2: {
  //         team1: [11,0],
  //         team2: [4,10],
  //       },
  //       table3: {
  //         team1: [2,5],
  //         team2: [6,8],
  //       },
  //     },
  //     { //9
  //       table1: {
  //         team1: [1,10],
  //         team2: [4,8],
  //       },
  //       table2: {
  //         team1: [2,0],
  //         team2: [5,11],
  //       },
  //       table3: {
  //         team1: [6,3],
  //         team2: [7,9],
  //       },
  //     },
  //     { //10
  //       table1: {
  //         team1: [1,11],
  //         team2: [5,9],
  //       },
  //       table2: {
  //         team1: [2,3],
  //         team2: [6,0],
  //       },
  //       table3: {
  //         team1: [7,4],
  //         team2: [8,10],
  //       },
  //     },
  //     { //11
  //       table1: {
  //         team1: [1,0],
  //         team2: [6,10],
  //       },
  //       table2: {
  //         team1: [3,4],
  //         team2: [2,7],
  //       },
  //       table3: {
  //         team1: [9,11],
  //         team2: [8,5],
  //       },
  //     },
  //   ]
  // });
    
    let array = [];
    
    //---- SET UP PLAYER LIST AND DETAILS
    let shuffledArray = shuffle(playersTonight);
    //we just randomized the playerlist. If we don't want to do that, replace "shuffledArray" with "playersTonight";

    shuffledArray.forEach((name, index) => {
      if(name != ""){
        array.push({
          playerID: index,
          name: name,
          score: 0,
          loners: 0,
          euchres: 0,
          quartersOwed: 0,
        });
      }
    });
    dispatch({
          playerList: array,
    });
    updateHistory({
      present : array});
  }, []);

 console.log(state.playerList);
  
 
  //set state for App display
  const [disp,setDisp] = useState(0);
  useEffect(() => {
    if(state.table >0 && state.table<=3){
    setDisp(1);
    }}
  );


  //case 0 (leaderboard and schedule) will be displayed on the big TV, so no need to make it mobile
  //case 1 (table data) could be displayed on laptop, tablet, or even phone.
  const tSelect = {
    0: (<div className="displayFlexBetween dashboard">
          <div className="board" >
            <h2>Top Scores</h2>
            <Leaderboard state={state} dispatch={dispatch} />
          </div>
          <div className="board" >
            <h2>Schedule</h2>
            <PlaySchedule state={state} dispatch={dispatch} />
          </div>
      </div>),
    1: (<RoundDetails
      state={state}
      dispatch={dispatch}
      history={history}
      updateHistory={updateHistory}
    />)
  }

    
 


  return (
    <div className={state.modalDisplay ? "modalOpen" : null}>
      <h1 className="visually-hidden">Game App</h1>
      <GameDetails state={state} dispatch={dispatch} />
      <div className="contentWrapper">
          {tSelect?.[disp]}
        
      </div>
    </div>
  );
};

export default App;