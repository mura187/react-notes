import React, { Component } from 'react';
import Draggable from 'react-draggable';
import './Note.css';
import {connect} from  'react-redux';
class Note extends Component {
   

  componentWillMount() {
    this.style =  {
      right: this.randomBetween(0, window.innerWidth - 150, 'px'),
      top: this.randomBetween(0, window.innerHeight - 150, 'px'),
      backgroundColor: this.props.background
    };
  }

  componentDidUpdate(){
    if(this.state.editing){
      this.newText.focus();
      this.newText.select();
    }
  }

  shouldComponentUpdate(nextProps, nextState){
    return this.props.children !== nextProps.children ||
            this.state !== nextState;
  }

  randomBetween = (x, y, s) => {
    return (x + Math.ceil(Math.random() * (y-x))) + s;
  }

  edit = () => {
    /*this.setState({
      editing: true,
      background: 'yellow'
    });*/ 
    this.props.dispatch({type: "EDIT"})
  }

  save = () => {
    this.props.onChange(this.newText.value, this.props.id);
    this.setState({editing: false});
  }

  remove = () => {
    this.props.onRemove(this.props.id);
  }

  renderForm = () => {
    return(
      <div className="note"
        style={this.style}>
        <textarea ref={newText => this.newText = newText}
          defaultValue={this.props.children}></textarea>
        <button onClick={this.save}>SAVE</button>
      </div>
    );
  }

  renderDisplay = () => {
    return(
      <div className="note"
        style={this.style}>
        <p>{this.props.children}</p>
        <span>
          <button onClick={this.edit.bind()}>Edit</button>
          <button onClick={this.remove}>X</button>
        </span>
      </div>
    );
  }

  render(){
    return(
      <Draggable>
        {
          this.props.editing ? this.renderForm()
                             :  this.renderDisplay()
        }
      </Draggable>
    );
  }
}
const mapStateToProps = (state) => ({
  editing:state.editing
})
export default connect(mapStateToProps)(Note);
