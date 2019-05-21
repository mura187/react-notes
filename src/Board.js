import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { SketchPicker } from 'react-color'; 
import Note from './Note';
import './Board.css';
import { addTodo, updateTodo, deleteTodo } from './redux/actions';

class Board extends Component{
  constructor(props){
    super(props);
    this.state = {
      background: 'yellow',
      showColorPicker: false
    };
  }

  nextId = () =>{
    this.uniqueId = this.uniqueId || this.props.notes.length;
    return this.uniqueId++;
  };

  add = (text) => {
    this.setState({text, showColorPicker: true});
  };

  update = (newText, id) => {
    this.props.updateTodo(id, newText);
  };

  remove = (id) => {
    this.props.deleteTodo(id);
  };

  handleChangeComplete = (color) => {

    this.props.addTodo({
      id: this.nextId(),
      note: this.state.text,
      color: color.hex
    });
    this.setState({showColorPicker: false});
  };

  eachNote = (note) => {
    return (<Note key={note.content.id}
                  id={note.content.id}
                  background={note.content.color}
                  onChange={this.update}
                  onRemove={this.remove}>
                    {note.content.note}
                  </Note>
    )
  };

  render(){
    return (
      <div className="board">
        {this.props.notes.map( this.eachNote )}
        <button onClick={() => this.add('New note')}>+</button>
        { this.state.showColorPicker ?
          <div className="color-picker">
            <SketchPicker
              color={ this.state.background }
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

const mapStateToProps = (state) => {
  return {
    notes: state.todos.notes
  }
};

export default connect(
  mapStateToProps,
  { addTodo, updateTodo, deleteTodo }
)(Board)

// export default Board;