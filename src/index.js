
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
//import App from './App';
import Board from './Board';
import * as serviceWorker from './serviceWorker';
import {createStore} from 'redux';
import {Provider} from 'react-redux';

const initialState = {
    text:'a',
    notes: [0,1],
    background: 'red',
    showColorPicker: false
}

function reducer(state = initialState, action,text,notes){
    switch(action.type){
        case "ADD":

        console.log('add CLICKED')    
        return{
            text:!state.text, 
            showColorPicker: !state.showColorPicker   
        };

        case "HANDLE_CHANGE_COMPLETE":
        return{
            notes, showColorPicker: false
        }

        case "EDIT":
        console.log('EDIT CLICKED')    
        return{
            ...state.editing
        }
        default:

            return state
}
}

const store = createStore(reducer);


const App = () =>(
<Provider store={store}>
<Board />
</Provider>
)

ReactDOM.render(
<App/>,
document.getElementById('root'));
serviceWorker.unregister();
