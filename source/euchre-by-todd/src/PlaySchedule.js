import React from "react";

const PlaySchedule = ({state}) => {
    return (
        <div className="playSchedule">
            {state.rounds?.map((item,i) => {
                return(
                    <div key={i} className={state.round === (i+1) ? "line active" : "line"}>
                        <h4>Round {i+1}</h4>
                        <div className="displayFlexBetween tableRow">
                            <div className="tableDetails">
                                <p><strong>Table 1</strong></p>
                                <p>{state.playerList.filter((player) => player.playerID === state.rounds[i]?.table1?.team1[0])[0]?.name} and {state.playerList.filter((player) => player.playerID === state.rounds[i]?.table1?.team1[1])[0]?.name} vs {state.playerList.filter((player) => player.playerID === state.rounds[i]?.table1?.team2[0])[0]?.name} and {state.playerList.filter((player) => player.playerID === state.rounds[i]?.table1?.team2[1])[0]?.name}      
                                </p>
                            </div>
                            <div className="tableDetails">
                                <p><strong>Table 2</strong></p>
                                <p>{state.playerList.filter((player) => player.playerID === state.rounds[i]?.table2?.team1[0])[0]?.name} and {state.playerList.filter((player) => player.playerID === state.rounds[i]?.table2?.team1[1])[0]?.name} vs {state.playerList.filter((player) => player.playerID === state.rounds[i]?.table2?.team2[0])[0]?.name} and {state.playerList.filter((player) => player.playerID === state.rounds[i]?.table2?.team2[1])[0]?.name}      
                                </p>
                            </div>
                            <div className="tableDetails">
                                <p><strong>Table 3</strong></p>
                                <p>{state.playerList.filter((player) => player.playerID === state.rounds[i]?.table3?.team1[0])[0]?.name} and {state.playerList.filter((player) => player.playerID === state.rounds[i]?.table3?.team1[1])[0]?.name} vs {state.playerList.filter((player) => player.playerID === state.rounds[i]?.table3?.team2[0])[0]?.name} and {state.playerList.filter((player) => player.playerID === state.rounds[i]?.table3?.team2[1])[0]?.name}      
                                </p>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    )
};

  export default PlaySchedule;