import { render } from './index.js';

export default function createStore(reducer, initialstate, ) {

    let temp = (localStorage.notedata!=undefined && localStorage.notedata!="undefined")?JSON.parse(localStorage.notedata):[];
    // let temp = JSON.parse(localStorage.notedata)
    // let temp = JSON.parse('[{"id":30,"note":"New note","color":"#a3a33f"}]')

    let state = temp;

    function dispatch(action) {
        // state = reducer(state, action)
        console.log(action.data)
        localStorage.notedata = JSON.stringify(action.data)
        console.log(localStorage.notedata)
        console.log(`the action is ${action.type}`)
        render();
    };

    function getState() {
        return state;
    };

    return {
        dispatch,
        getState
    };
};