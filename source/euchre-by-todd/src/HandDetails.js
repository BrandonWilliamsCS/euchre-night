import React from "react";
import { useState, useEffect } from "react";

const HandDetails = ({
    screen, 
    setScreen, 
    hand, 
    setHand,
    state, 
    dispatch, 
    history,
    updateHistory,
}) => {

    console.log("%c HANDDETAILS.JS", "background: purple; color:black");

    const [disp, setDisp] = useState(0);
    const [trump, setTrump] = useState();

    function defineTrump(trumpC) {
        //if trap card turned up, everyone pays a quarter.
        if (document.getElementById('trapActive').checked){
            dispatch({
                team1Quarters: state.team1Quarters + 1,
                team2Quarters: state.team2Quarters + 1,
            });
        }
        //update current trump display
        if(trumpC === '♠️'){
            setTrump(<img className="cardSuit" src="./src/Assets/euchre-icon-spade.svg" />);
        } else if(trumpC === '♥️'){
            setTrump(<img className="cardSuit" src="./src/Assets/euchre-icon-heart.svg" />);
        } else if(trumpC === '♣️'){
            setTrump(<img className="cardSuit" src="./src/Assets/euchre-icon-club.svg" />);
        } else if(trumpC === '♦️'){
            setTrump(<img className="cardSuit" src="./src/Assets/euchre-icon-diamond.svg" />);
        } else {
            setTrump(<img className="cardSuit" src="./src/Assets/euchre-icon-none.svg" />);
        }

        //display trump suit
        setDisp(1);
        history.lastDisp = [...history.lastDisp, history.curDisp];
        history.curDisp=1;
        //save history
        history.i++;
        console.log(`history index set to ${history.i}`)
        history.past = [...history.past, history.present];
        history.present = state.playerList;
        console.log(`history length is ${history.past.length}`);
        console.log(`history state is ${history.past}`);

    };
    function finishHand() { 
        setScreen(screen +1); 
        history.curScreen=screen;
        
    };
    function previous() {
        //undo history
        history.i--;
        console.log(`history index reduced to ${history.i}`)
        history.present = history.past[history.past.length-1];
        state.playerList = history.present;
        history.past.pop();
        console.log(`history length is ${history.past.length}`);
        console.log(`history state is ${history.past}`);

        setDisp(disp-1);
        history.curDisp = history.lastDisp[history.lastDisp.length-1];
        history.lastDisp.pop();
    }
    //set up steps for this screen
    const tSelect = {
            0: (<div className="trumpSelect">
                    <p className="question">What’s Trump</p>
                    <div className="displayFlexBetween cardDisplay">
                        <button className="trump spade" onClick={() => defineTrump('♠️')}><img className="cardSuit" src="./src/Assets/euchre-icon-spade.svg" /></button>
                        <button className="trump heart" onClick={() => defineTrump('♥️')}><img className="cardSuit" src="./src/Assets/euchre-icon-heart.svg" /></button>
                        <button className="trump club" onClick={() => defineTrump('♣️')}><img className="cardSuit" src="./src/Assets/euchre-icon-club.svg" /></button>
                        <button className="trump diamond" onClick={() => defineTrump('♦️')}><img className="cardSuit" src="./src/Assets/euchre-icon-diamond.svg" /></button>
                    </div>
                    <div className="displayFlexBetween additionalOptions">
                        <button className="trump noTrump" onClick={() => defineTrump('🚫')}>No Trump</button>
                        <div className="selectContainer">
                            <input id="trapActive" type="checkbox" /> 
                            <label htmlFor="trapActive" className="trapSelect"><span className="trapCard">{state.trapCard}</span> Turned Up</label>
                        </div>
                    </div>
                </div>),
            1:  (<div className="trumpSelect">
                <p className="question">Trump is</p>
                    <div className="currentTrump">{trump}</div>
                    <button className="button" onClick={() => finishHand()}>Hand Over</button>
                <a className="prev" onClick={() => previous()}>Previous</a>
                </div>)
    }

    return(
        <div className="handDetails">
            <p className="roundNum">Deal {hand} of 4</p>
            {tSelect?.[disp]}
        </div>
    );
};

export default HandDetails;