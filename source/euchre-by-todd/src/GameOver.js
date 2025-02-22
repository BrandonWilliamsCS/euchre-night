import React from "react";
import { useState, useEffect } from "react";

const GameOver = ({state, dispatch, screen, setScreen, history,
    updateHistory }) => {
    console.log("%c GAMEOVER.JS", "background: purple; color:black");


    console.log(`GAME OVER!! round: ${state.round} nextround:`);
    console.log(state.rounds[state.round]);

    const [p1To, setp1To] = useState(" and has a by-round");
    const [p2To, setp2To] = useState(" and has a by-round");
    const [p3To, setp3To] = useState(" and has a by-round");
    const [p4To, setp4To] = useState(" and has a by-round");

    let curRound = state.rounds[state.round];

       
    //update player data and assign next tables 
    useEffect(()=>{ 
        //update player quarters
        state.playerList.filter((player) => player.playerID === state.t1p1.playerID)[0].quartersOwed += state.team1Quarters;
        state.playerList.filter((player) => player.playerID === state.t1p2.playerID)[0].quartersOwed += state.team1Quarters;
        state.playerList.filter((player) => player.playerID === state.t2p2.playerID)[0].quartersOwed += state.team2Quarters;
        state.playerList.filter((player) => player.playerID === state.t2p1.playerID)[0].quartersOwed += state.team2Quarters;
        
        //set Next Table Assignments
        //loop through tables
        for(let i=1;i<4;i++){
            let curTable = curRound["table" + i];
            //loop through teams
            for(let t=1;t<3;t++){
                let curTeam = curTable["team" + t];
                if(state.t1p1?.playerID === curTeam[0] || state.t1p1?.playerID === curTeam[1]){
                    setp1To(" and goes to Table " + i);
                }
                if(state.t1p2?.playerID === curTeam[0] || state.t1p2?.playerID === curTeam[1]){
                    setp2To(" and goes to Table " + i);
                }
                if(state.t2p1?.playerID === curTeam[0] || state.t2p1?.playerID === curTeam[1]){
                    setp3To(" and goes to Table " + i);
                }
                if(state.t2p2?.playerID === curTeam[0] || state.t2p2?.playerID === curTeam[1]){
                    setp4To(" and goes to Table " + i);
                }
            }  
        }
    },[])
    
    // assign next players
    const thisRound= state.rounds[state.round];
    const thisTable = "table" + state.table;
    const team1 = thisRound[thisTable]?.team1;
    const team2 = thisRound[thisTable]?.team2;


    let t1p1N = state.playerList.filter((player) => player.playerID === team1[0])[0];
    let t1p2N = state.playerList.filter((player) => player.playerID === team1[1])[0];
    let t2p1N = state.playerList.filter((player) => player.playerID === team2[0])[0];
    let t2p2N = state.playerList.filter((player) => player.playerID === team2[1])[0];

    //update player data to prep for next round.
    function nextRound(){
        dispatch({
            round: state.round + 1,
            team1Score: 0,
            team2Score: 0,
            team2Quarters: 0,
            team1Quarters: 0,
            t1p1: t1p1N,
            t1p2: t1p2N,
            t2p1: t2p1N,
            t2P2: t2p2N,
        });
        setp1To(" and has a by-round");
        setp2To(" and has a by-round");
        setp3To(" and has a by-round");
        setp4To(" and has a by-round");
        setScreen(0);
    }

    return(
        <div className="gameOver">
               <div className="displayFlexBetween results">
                <div className="team">
                        <p>{state.t1p1.name} pays {state.team1Quarters} quarters{state.round != state.rounds.length ? p1To : null}.</p>
                        <p>{state.t1p2.name} pays {state.team1Quarters}  quarters{state.round != state.rounds.length ? p2To : null}.</p>
                </div>
                <div className="team">
                        <p>{state.t2p1.name} pays {state.team2Quarters}  quarters{state.round != state.rounds.length ? p3To : null}.</p>
                        <p>{state.t2p2.name} pays {state.team2Quarters} quarters{state.round != state.rounds.length ? p4To : null}.</p>
                    </div>
               </div>
               {state.round === state.rounds.length ? <div className="killScreen">Thanks for playing! Check your scores and enjoy your evening.</div> : 
               <div>
                <p className="nextRound">Up Next: Round {state.round +1}</p>
                <div className="match displayFlexBetween">
                    <div className="team next">
                        <p>{t1p1N?.name} and {t1p2N?.name}</p>
                    </div>
                    <p className="vs">VS</p>
                    <div className="team next">
                        <p>{t2p1N?.name} and {t2p2N?.name}</p>
                    </div>
                </div>
                <button className="button" onClick={() => nextRound()}>Start Next Game</button>
            </div> }
        </div> 
    );
};

export default GameOver;