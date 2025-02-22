import React from "react";
import { useState } from "react";


    //in the props, include any possible props we need to return.
const ScreenManager = ({
    state,
    dispatch,
    screen,
    setScreen,
    hand, 
    setHand,
    screens,
    step,
    setStep,
    history,
    updateHistory,
}) => {
    console.log("%c SCREENMANAGER.JS", "background: purple; color:black");

    if(screen != undefined){
        let page = screen +1;
        return screens["SCREEN" + page];
    }
    if(history.curStep != undefined){ 
        let steps = history.curStep +1;
        console.log(`CURSTEP IS ${history.curStep}`)
        return screens["SCREEN" + steps];
    }

}

export default ScreenManager;