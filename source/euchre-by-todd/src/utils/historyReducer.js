const INITIAL_HISTORY = {
    //called with history.[variable]
    //step is for the Win Screen questions
    lastStep: [0],
    curStep:0,
    //Screen is to cycle through Hand Details, Win Screen, and Game Over
    lastScreen: [0],
    curScreen:0,
    //disp is used for HandDetails
    lastDisp:[0],
    curDisp: 0,


    //store player state here
    //Save as a deep copy, using JSON Stringify
    past: [],
    present: [],


    //Debating if we'll need to store round scores, if we need a previous after starting a hand.
    //store table states here:
    scoreHistory1: [0],
    scoreHistory2: [0],
};

//  Looking at creating a reusable function to add items to save state.
// const saveAction = {
//     type: 'SAVE',
//     payload: [step, screen, disp, past, scoreHistory1, scoreHistory2],

// }
// const undoAction = {
//     type: 'UNDO',
//     payload: [`same as above I think`],
// }
// const setHistory = (existing = INITIAL_HISTORY,action) => {
//     switch (action.type){
//         case SAVE:
//             return{
//                 ...existing,
//                 //save history
//                 lastStep : [...history.lastStep, history.curStep],
//                 i: i++,
//                 past : [...history.past, history.present],
//                 present : state.playerList,

//             };
//         case UNDO:
//             return{
//                 ...existing,
//                 i: i--,
//                 present: history.past[history.past.length-1],
//                 past: past.pop(),
//                 curStep : history.lastStep[history.lastStep.length-1],
//                 lastStep: history.lastStep.pop(),
//                 scoreHistory1: action.payload[whatevernumberitis],
//                 scoreHistory2: action.payload[whatevernumberitis],
//             }
//         default:
//             return state;
//     }
// }
export function historyReducer(history, action) {
    return { ...history, ...action };
}
historyReducer.INITIAL_HISTORY = INITIAL_HISTORY;