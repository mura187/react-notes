import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { SketchPicker } from 'react-color'; 
import Note from './Note';
import './Board.css';
import {connect} from  'react-redux';

class Board extends Component{
  constructor(props){
    super(props);
    /*this.state = {
      notes: [0,1],
      background: 'green',
      showColorPicker: false
    };*/
  }

  // componentWillMount(){
  //   if(this.props.count){
  //     let url = `http://baconipsum.com/api/?type=all-meat&sentences=${this.props.count}`;
  //     fetch(url)
  //           .then(results => results.json())
  //           .then(array => array[0])
  //           .then(text => text.split('. '))
  //           .then(array => array.forEach(sentence => this.add(sentence)))
  //           .catch(err => console.log("Didn't connect to the API", err));
  //   }
  // }

  nextId = () =>{
    this.uniqueId = this.uniqueId || 0;
    return this.uniqueId++;
  };

  add = (text) => {
    //this.setState({text, showColorPicker: true});
    this.props.dispatch({type:"ADD"})
  };

  update = (newText, id) => {
    let notes = this.state.notes.map(
      note => (note.id !== id) ?
        note :
        {
          ...note,
          note: newText
        }
    );
    this.setState({notes});
  };

  remove = (id) => {
    let notes = this.state.notes.filter(note => note.id !== id);
    this.setState({notes});
  };

  handleChangeComplete = (color) => {
    let notes = [
      ...this.state.notes,
      {
        id: this.nextId(),
        note: this.state.text,
        color: color.hex
      }
    ];
    this.setState({notes, showColorPicker: false});
  };

  eachNote = (note) => {
    return (<Note key={note.id}
                  id={note.id}
                  background={note.color}
                  onChange={this.update}
                  onRemove={this.remove}>
                    {note.note}
                  </Note>
    )
  };

  render(){
    return (
      <div className="board">
        {this.props.notes.map( this.eachNote )}
        <button onClick={() => this.add('новая заметка')}>+</button>
        { this.props.showColorPicker ?
          <div className="color-picker">
            <SketchPicker
              color={ this.props.background }
              onChangeComplete={this.handleChangeComplete}/>
          </div> :
          null
        }
      </div>
    );
  }
}

Board.propTypes = {
  count: PropTypes.number
};

const mapStateToProps = (state) => ({
  notes: [0,1],
  background: 'green',
  showColorPicker: false
})
export default connect(mapStateToProps)(Board);
