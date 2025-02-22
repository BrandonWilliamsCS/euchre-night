import React from 'react';
import { useState, useEffect } from 'react';
import Leaderboard from './Leaderboard';
import PlaySchedule from './PlaySchedule';

const Modal = ({state, dispatch, modalName, modalID}) => {
    console.log("%c MODAL.JS", "background: purple; color:black");


    //HTML for Table Rules
    const tableRules = (<div className="rules">
        <div className="line">
            <h4>Trap Card</h4>
            <p>If the {state.trapCard} turns up on the kitty, everyone must pay 1 quarter.</p>
        </div>
        <div className="line">
            <h4>Go Under</h4>
            <p>During the first call for trump, if you have at least three 9's or 10's in your hand, you can opt to "Go Under" and replace cards from the kitty.</p>
        </div>
        <div className="line">
            <h4>Call for Best</h4>
            <p>If you choose to go alone, you exchange one card with your partner.</p>
        </div>
        <div className="line">
            <h4>Stick the Dealer</h4>
            <p>If everyone passes calling trump, the dealer must decide what is trump instead of redealing.</p>
        </div>
        <div className="line">
            <h4>Euchre</h4>
            <p>If the team that calls trump loses the hand, they must pay 1 quarter. The winning team gets 2 points.</p>
        </div>
        <div className="line">
            <h4>Loner</h4>
            <p>If a player makes a successful loner (takes all tricks), the opposing team must pay 1 quarter. The winning team gets 4 points.</p>
        </div>
        <div className="line">
            <h4>Sweep</h4>
            <p>If a team takes all tricks in a hand when they called trump, they win 2 points.</p>
        </div>
        <div className="line">
            <h4>Losing team</h4>
            <p>The team with the fewest points after four hands pays 1 quarter.</p>
        </div>

        
    </div>
    );

    //allows modal background to trigger the close event without adding the event to the nested modalBody.
    function closeHandler(e){
        if(e.target === document.querySelector(".modal")){
            dispatch({modalDisplay: false});
        }
    }

   //Set up the different modal displays
    const modalType = {
        //round Details
        modalRound: (<div className="modalBody">
            <div className="displayFlexBetween">
                <p>Round {state.round} of {state.rounds.length}</p>
                <a className="close" onClick={() => dispatch({modalDisplay: false})}><img src="./src/Assets/euchre-icon-close.svg" /></a>
            </div>
            <hr></hr>
            <h3>Round Details</h3>
            <PlaySchedule state={state} dispatch={dispatch} />
        </div>),

        //table Details
        modalTable: (<div className="modalBody">
            <div className="displayFlexBetween">
                <p>Round {state.round} of {state.rounds.length}</p>
                <a className="close" onClick={() => dispatch({modalDisplay: false})}><img src="./src/Assets/euchre-icon-close.svg" /></a>
            </div>
            <hr></hr>
            <h3>Table {state.table > 0 && state.table < 4 ? state.table : null} Rules</h3>
            {tableRules}
        </div>),
        
        //Leaderboard
        modalLeaderboard: (<div className="modalBody" >
            <div className="displayFlexBetween">
                <p>Round {state.round} of {state.rounds.length}</p>
                <a className="close" onClick={() => dispatch({modalDisplay: false})}><img src="./src/Assets/euchre-icon-close.svg" /></a>
            </div>
            <hr></hr>
            <h3>Leaderboard</h3>
            <Leaderboard state={state} dispatch={dispatch} />
        </div>),
    }


    return(
        <div id={modalName} 
        className={state.modalDisplay ? 'modal' : 'modal hidden' } 
        onClick={(e) => closeHandler(e)} >
                {modalType?.[modalID]}
        </div>
    );
};

export default Modal;