import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { SketchPicker } from 'react-color';
import Note from './Note';
import './Board.css';



class Board extends Component {
	constructor(props) {
		super(props);
		this.state = {
			notes: [],
			background: 'yellow',
			showColorPicker: false
		};
		this.state.notes = this.props.store.getState();
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

	nextId = () => {
		this.uniqueId = this.uniqueId || this.state.notes.length;
		return this.uniqueId++;
	};

	add = (text) => {
		this.setState({ text, showColorPicker: true });
	};

	update = (newText, id) => {
		console.log(this.props)
		this.props.store.dispatch({ type: 'SAVE_NOTES', data:this.state.notes });
		let notes = this.state.notes.map(
			note => (note.id !== id) ?
				note :
				{
					...note,
					note: newText
				}
		);
		this.setState({ notes });
	};

	remove = (id) => {
		let notes = this.state.notes.filter(note => note.id !== id);
		this.setState({ notes });
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
		
		this.setState({ notes, showColorPicker: false });
		this.props.store.dispatch({ type: 'SAVE_NOTES', data:this.state.notes });
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

	render() {
		return (
			<div className="board">
				{this.state.notes.map(this.eachNote)}
				<button onClick={() => this.add('New note')}>+</button>
				{this.state.showColorPicker ?
					<div className="color-picker">
						<SketchPicker
							color={this.state.background}
							onChangeComplete={this.handleChangeComplete} />
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

export default Board;
