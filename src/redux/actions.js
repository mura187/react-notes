import { ADD_TODO, TOGGLE_TODO, SET_FILTER, UPDATE_TODO, DELETE_TODO } from "./actionTypes";

let nextTodoId = 0;

export const addTodo = content => ({
  type: ADD_TODO,
  payload: {
    id: ++nextTodoId,
    content
  }
});
export const updateTodo = (id, content) => ({
  type: UPDATE_TODO,
  payload: {
    id: id,
    note: content
  }
});
export const deleteTodo = (id, content) => ({
  type: DELETE_TODO,
  payload: {
    id: id,
    note: content
  }
});
export const toggleTodo = id => ({
  type: TOGGLE_TODO,
  payload: { id }
});

export const setFilter = filter => ({ type: SET_FILTER, payload: { filter } });
