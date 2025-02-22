import React from "react";
import { useState } from "react";
import Modal from "./Modal";


const GameDetails = ({state, dispatch}) => {
    console.log("%c GAMEDETAILS.JS", "background: purple; color:black");
    const [modalID, setID] = useState();
    
    function openModal (id){
        setID(id);
        dispatch({modalDisplay: true});
    }

    return(
        <div className="gameDetails displayFlexBetween">
            <Modal modalName="roundModal" state={state} dispatch={dispatch} modalID={modalID} setID={setID}  />
            <a onClick={() => openModal("modalRound")} >Round Number {state.round} of {state.rounds.length} <img className="icon" src="./src/Assets/euchre-icon-info.svg" /></a>
            <a onClick={() => openModal("modalTable")}>Table {state.table > 0 && state.table < 4 ? state.table : null} Rules <img className="icon" src="./src/Assets/euchre-icon-info.svg" /></a>
            <a onClick={() => openModal("modalLeaderboard")}>Leaderboard <img className="icon" src="./src/Assets/euchre-icon-info.svg" /></a>
        </div>
        );
};

export default GameDetails;