import React, { Component } from 'react';
import Note from './Note';
import Board from './Board';

class App extends Component {
  render() {
    return (
      <div>
        <Board>
            <Note/>
        </Board>
      </div>
    );
  }
}

export default App;
