import React, { Component } from 'react';
import Note from './Note';
import Board from './Board';
import createStore from './createStore';
import changeCount from './reducers/changeCount';

const store = createStore(changeCount);

class App extends Component {
  constructor(props) {
		super(props);
    console.log(props)
  }

  render() {
    return (
      <div>
        <Board  store={store} >
            <Note/>
        </Board>
      </div>
    );
  }
}

export default App;