import React from "react";
import { useState, useEffect } from "react";
import GameOver from "./GameOver";
import ScreenManager from "./ScreenManager";
import HandDetails from "./HandDetails";

const WinScreen = ({
    state,
    dispatch,
    screen, 
    setScreen, 
    hand, 
    setHand, 
    history,
    updateHistory,
    }) => {

    console.log("%c WINSCREEN.JS", "background: purple; color:black");

    //set up state to track winners and losers
    const [roundWinner1, setRoundWinner1] = useState();
    const [roundWinner2, setRoundWinner2] = useState();
    const [roundLoser1, setRoundLoser1] = useState();
    const [roundLoser2, setRoundLoser2] = useState();


    function checkGameOver(){
        console.log("triggered gameover check")
        if(hand<4){
            //setStep(3);
            //history.curStep=3;
            updateHistory({curStep: 3});
        } else {
            //setStep(4);
            updateHistory({curStep: 4});
        }
        history.lastStep = [...history.lastStep, history.curStep]; 

    }

    //define the winners and losers.
    function winningTeam(player1, player2, loser1, loser2) {
        setRoundWinner1(player1);
        setRoundWinner2(player2);
        setRoundLoser1(loser1);
        setRoundLoser2(loser2);

        //save history
        history.lastStep = [...history.lastStep, history.curStep];  

       
        history.past = [...history.past, JSON.parse(JSON.stringify(history.present))];
        history.present = {...JSON.parse(JSON.stringify(state.playerList))};
        updateHistory({scoreHistory1: [...history.scoreHistory1, state.team1Score]});
        updateHistory({scoreHistory2: [...history.scoreHistory2, state.team2Score]});
        //setStep(1);  
        history.curStep = 1;  

    }
   
    function euchreGet(){
        //increment euchre count for winning players.
        if (state.playerList.length > 0){
            state.playerList.filter((player) => player.playerID === roundWinner1.playerID)[0].euchres++;
            state.playerList.filter((player) => player.playerID === roundWinner2.playerID)[0].euchres++;
        }
        
        //force losers to pay
        if(roundWinner1 === state.t1p1){
            dispatch({team2Quarters: state.team2Quarters + 1});
        } else if(roundWinner1 === state.t2p1){
            dispatch({team1Quarters: state.team1Quarters + 1});
        }
        //increase the team score by 2
        setScore(2);
        
        //save history
        history.lastStep = [...history.lastStep, history.curStep]; 

        
        history.past = [...history.past, JSON.parse(JSON.stringify(history.present))];
        history.present = {...JSON.parse(JSON.stringify(state.playerList))};

        checkGameOver();
    }

    function lonerGet(){
        //force losers to pay
        if(roundWinner1 === state.t1p1){
            dispatch({team2Quarters: state.team2Quarters + 1});
        } else if(roundWinner1 === state.t2p1){
            dispatch({team1Quarters: state.team1Quarters + 1});
        }
        //increase the team score by 4
        setScore(4);
        //save history
        history.lastStep = [...history.lastStep, history.curStep]; 

        
        history.past = [...history.past, JSON.parse(JSON.stringify(history.present))];
        history.present = {...JSON.parse(JSON.stringify(state.playerList))};
        updateHistory({scoreHistory1: [...history.scoreHistory1, state.team1Score]});
        updateHistory({scoreHistory2: [...history.scoreHistory2, state.team2Score]});
        //setStep(2);
        updateHistory({curStep: 2});

    }

    function lonerWin(playerL){
        console.log("triggered lonerWin")
        //increase the loner counter for the correct player
        if (state.playerList.length > 0){
            state.playerList.filter((player) => player.playerID === playerL.playerID)[0].loners++;
        }
        //save history


        history.past = [...history.past, JSON.parse(JSON.stringify(history.present))];
        history.present = {...JSON.parse(JSON.stringify(state.playerList))};

        updateHistory({scoreHistory1: [...history.scoreHistory1, state.team1Score]});
        updateHistory({scoreHistory2: [...history.scoreHistory2, state.team2Score]});

        checkGameOver();
    }

    function sweepGet(){
        //increase the team score by 2
        setScore(2);
        //save history
        history.lastStep = [...history.lastStep, history.curStep]; 
        
        
        history.past = [...history.past, JSON.parse(JSON.stringify(history.present))];
        history.present = {...JSON.parse(JSON.stringify(state.playerList))};

        checkGameOver();
    }

    function regGet(){
        //increase the team score by 1
        setScore(1);
        //save history
        history.lastStep = [...history.lastStep, history.curStep]; 

   
        history.past = [...history.past, JSON.parse(JSON.stringify(history.present))];
        history.present = {...JSON.parse(JSON.stringify(state.playerList))};

        checkGameOver();
    }

    function setScore(n){
        //check which team was the winner by comparing round winner 1 against team 1 player 1
        if(roundWinner1 === state.t1p1){
            dispatch({team1Score: state.team1Score + n});
        } else {
            dispatch({team2Score: state.team2Score + n});
        }
        updateHistory({scoreHistory1: [...history.scoreHistory1, state.team1Score]})
        updateHistory({scoreHistory2: [...history.scoreHistory2, state.team2Score]})

    }

    function nextHand(){
        updateHistory({
            lastStep: [0],
            curStep: 0,
            curDisp:0,
            historyArray: [0],
            scoreHistory1: [state.team1Score],
            scoreHistory2: [state.team2Score],
        })
        setHand(hand+1);
        setScreen(0); 
        history.curScreen=0;
    }


    function gameOver(){
        //update player scores
        if (state.playerList.length > 0){
            state.playerList.filter((player) => player.playerID === state.t1p1.playerID)[0].score += state.team1Score;
            state.playerList.filter((player) => player.playerID === state.t1p2.playerID)[0].score += state.team1Score;
            state.playerList.filter((player) => player.playerID === state.t2p1.playerID)[0].score += state.team2Score;
            state.playerList.filter((player) => player.playerID === state.t2p2.playerID)[0].score += state.team2Score;

        }

        //add a quarter for the losing team
        //Quarters get updated in GameOver.js so that state has time to populate before dispatching to the player totals.
        if(state.team1Score > state.team2Score){
            dispatch({team2Quarters: state.team2Quarters + 1});
        } else if (state.team2Score > state.team1Score){
            dispatch({team1Quarters: state.team1Quarters + 1});
        }
        updateHistory({
            lastStep: [0],
            curStep: 0,
            curDisp:0,
            historyArray: [0],
        })
        setScreen(0); 
        history.curScreen=0;
        setHand(1);
        setScreen(screen +1); 
    }
   
    function previous() {
        //undo history
        history.present = {...JSON.parse(JSON.stringify(history.past[history.past.length-2]))};

        dispatch({
            playerList: JSON.parse(JSON.stringify(history.past[history.past.length-2])),
            team1Score:  history.scoreHistory1[history.scoreHistory1.length-1],
            team2Score:  history.scoreHistory2[history.scoreHistory2.length-1],
        });

        updateHistory({
            scoreHistory1: [...history.scoreHistory1].slice(0,history.scoreHistory1.length-1),
            scoreHistory2: [...history.scoreHistory2].slice(0,history.scoreHistory2.length-1),
        })
        
        //history.past.pop();
        dispatch({past: [...history.past].slice(0,history.past.length-1)});
        
        updateHistory({
            curStep : history.lastStep[history.lastStep.length-1],
            lastStep: [...history.lastStep].slice(0,history.lastStep.length-1),
        });


    }


    //Step Screen Manager
    const [step, setStep] = useState(0);
    const screens = scoreScreens(step, setStep);

    function scoreScreens(step, setStep, history){
        const screens = {
            SCREEN1: (
                <div>
                    <p className="question">Which team won?</p>
                    <div className="displayFlexLeft cardButtons">
                        <button className="card" onClick={() => winningTeam(state.t1p1, state.t1p2, state.t2p1, state.t2p2)}>{state.t1p1.name} and {state.t1p2.name}</button>
                        <button className="card" onClick={() => winningTeam(state.t2p1, state.t2p2, state.t1p1, state.t1p2)}>{state.t2p1.name} and {state.t2p2.name}</button>
                    </div>
                </div>
            ),
            SCREEN2: (
                <div>
                    <p className="question">Do any of these apply?</p>
                    <div className="displayFlexBetween cardButtons">
                        <button className="card" onClick={() => euchreGet()}>Euchre</button>
                        <button className="card" onClick={() => lonerGet()}>Loner</button>
                        <button className="card" onClick={() => sweepGet()}>Sweep</button>
                        <button className="card" onClick={() => regGet()}>None of these</button>
                    </div>
                    <a className="prev" onClick={() => previous()}>Previous</a>
                </div>
            ),
            SCREEN3: (
                <div>
                    <p className="question">Who had the loner?</p>
                    <div className="displayFlexLeft">
                        <button className="card" onClick={() => lonerWin(roundWinner1)}>{roundWinner1?.name}</button>
                        <button className="card" onClick={() => lonerWin(roundWinner2)}>{roundWinner2?.name}</button>
                    </div>
                    <a className="prev" onClick={() => previous()}>Previous</a>
                </div>
            ),
            SCREEN4: (
                <div>
                    <button className="button" onClick={() => nextHand()}>Next Round</button>
                    <a className="prev" onClick={() => previous()}>Previous</a>
                </div>
            ),
            SCREEN5: (
                <div>
                    <button className="button" onClick={() => gameOver()}>Game Over</button>
                    <a className="prev" onClick={() => previous()}>Previous</a>
                </div>
            )
        }
        return screens;
    }


    return(
        <div className="winScreen">
            <p className="roundNum">Deal {hand} of 4</p>
            <ScreenManager state={state} dispatch={dispatch} step={step} setStep={setStep} screens={screens} history={history} />
    </div>
    );
}

export default WinScreen;