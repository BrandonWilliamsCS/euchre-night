import React from 'react';
import { useState, useEffect } from 'react';
import HandDetails from './HandDetails';
import WinScreen from './WinScreen';
import GameOver from './GameOver';
import ScreenManager from './ScreenManager';



const RoundDetails = ({state, dispatch, history,
    updateHistory,}) => {
    console.log("%c ROUNDDETAILS.JS", "background: purple; color:black");
        
    //Find out who's playing at this table.
    const curMatch = state.rounds[state.round-1]?.["table" + state.table];
    //store this table's team player IDs
    const team1 = curMatch.team1;
    const team2 = curMatch.team2;


    //set initial players. These will be updated on the GameOver screen.
    useEffect(() => {
        dispatch({
            t1p1: state.playerList.filter((player) => player.playerID === team1[0])[0],
            t1p2: state.playerList.filter((player) => player.playerID === team1[1])[0],
            t2p1: state.playerList.filter((player) => player.playerID === team2[0])[0],
            t2p2: state.playerList.filter((player) => player.playerID === team2[1])[0],
        });
    }, []);


    //State for ScreenManager
    const [screen, setScreen] = useState(0);

    //Track what hand we're on.
        const [hand, setHand] = useState(1);
        console.log("Hand " + hand);
    //screens to pass into ScreenManager
    function gameScreen(
        state,
        dispatch,
        screen, 
        setScreen, 
        hand, 
        setHand,
        history,   
        updateHistory,
    ){
        //don't forget to add props to the "screens" variable below this function!
        const screens = {
            SCREEN1: (<HandDetails 
                state={state}
                dispatch={dispatch}
                screen={screen} 
                setScreen={setScreen} 
                hand={hand} 
                setHand={setHand} 
                history={history}
                updateHistory={updateHistory}
                />),
            SCREEN2: (<WinScreen 
                state={state}
                dispatch={dispatch}
                screen={screen} 
                setScreen={setScreen} 
                hand={hand} 
                setHand={setHand} 
                history={history}
                updateHistory={updateHistory}

                />),
            SCREEN3: (<GameOver 
                state={state}
                dispatch={dispatch}
                screen={screen} 
                setScreen={setScreen} 
                history={history}
                updateHistory={updateHistory}
                />),
        }
        return screens;
    }

    const screens = gameScreen(
        state, 
        dispatch,
        screen, 
        setScreen, 
        hand, 
        setHand,
        history,
        updateHistory,
    );
    

    return(
    <div className="roundDetails">
        <h2>Table {state.table}</h2>
        
        <div className="match displayFlexBetween">
            <div className="team">
                <p>{state.t1p1?.name} and {state.t1p2?.name}</p>
                <div className="score">{state.team1Score}</div>
            </div>
            <p className="vs">VS</p>
            <div className="team">
                <p>{state.t2p1?.name} and {state.t2p2?.name}</p>
                <div className="score">{state.team2Score}</div>
            </div>
        </div>
        <ScreenManager 
        state={state}
        dispatch={dispatch}
        screen={screen} 
        setScreen={setScreen} 
        hand={hand} 
        setHand={setHand} 
        screens={screens} 
        history={history}
        updateHistory={updateHistory}
        />

    </div>
    );
};

export default RoundDetails;