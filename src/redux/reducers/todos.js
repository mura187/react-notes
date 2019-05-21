import { ADD_TODO, UPDATE_TODO, DELETE_TODO } from "../actionTypes";

let temp = (localStorage.notedata!=undefined && localStorage.notedata!="undefined")?JSON.parse(localStorage.notedata):[];
console.log(temp)
const initialState = {
  notes: temp
};

export default function(state = initialState, action) {
  
  switch (action.type) {
    case ADD_TODO: {
      var notes = JSON.parse(JSON.stringify(state.notes));
      notes.push(action.payload);
      localStorage.notedata = JSON.stringify(notes);
      return {
        ...state,
        notes: notes,
      };
    }
    case UPDATE_TODO: {
      var notes = JSON.parse(JSON.stringify(state.notes));
      var filteredNotes = notes.filter(item =>(item.content.id) === (action.payload.id));
      console.log(notes)
      console.log(action)
      console.log(filteredNotes)
      if (filteredNotes.length === 0) return state;
      filteredNotes[0].content.note = action.payload.note;
      localStorage.notedata = JSON.stringify(notes);
      return {
        ...state,
        notes: notes,
      };
    }
    case DELETE_TODO: {
      var notes = JSON.parse(JSON.stringify(state.notes));
      
      var filteredNotes = notes.filter(item =>(item.content.id) !== (action.payload.id));
      localStorage.notedata = JSON.stringify(filteredNotes)
      return {
        ...state,
        notes: filteredNotes,
      };
    }
    default:
      return state;
  }
}
