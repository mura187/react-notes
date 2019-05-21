
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { connect } from 'react-redux';
import { redux } from "redux";
import * as serviceWorker from './serviceWorker';
// import {createStore} from  'redux';
import changeCount from './reducers/changeCount';
import createStore from './createStore';

const store = createStore(changeCount);

export function render () {
    ReactDOM.render(<App />, document.getElementById('root'));
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();


// import React from 'react';
// import ReactDOM from 'react-dom';
// import App from './App';
// import changeCount from './reducers/changeCount';
// import createStore from './createStore';

// const store = createStore(changeCount);

// export function render() {
//   ReactDOM.render(
//     <App store={store} />,
//     document.getElementById('root')
//   );
// };
// let temp = (localStorage.notedata!=undefined&&localStorage.notedata!="undefined")?JSON.parse(localStorage.notedata):[];
let temp = (localStorage.notedata!=undefined && localStorage.notedata!="undefined")?JSON.parse(localStorage.notedata):[];

console.log(temp)
store.dispatch({ type: '@@INIT', data: temp});