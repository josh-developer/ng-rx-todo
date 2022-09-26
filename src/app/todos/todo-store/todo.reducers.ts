import { createReducer, on } from '@ngrx/store';
import { ITodo } from '../../shared/interfaces/todo';
import {
  addTodoSuccess,
  editTodoSuccess,
  removeTodoSuccess,
} from './todo.actions';

export const TODOS_LOCAL_NAME = 'todos';
const savedTodos = JSON.parse(localStorage.getItem(TODOS_LOCAL_NAME)!);
const initialTodos: ITodo[] = savedTodos || [];

export const todoReducer = createReducer(
  initialTodos,
  on(addTodoSuccess, (todos, newState) => {
    todos = JSON.parse(JSON.stringify(todos));
    return [...todos, newState.todo];
  }),
  on(removeTodoSuccess, (todos, removeIndex) => {
    todos = JSON.parse(JSON.stringify(todos));
    return todos.filter((_, index) => index !== removeIndex.index);
  }),
  on(editTodoSuccess, (todos, { index, todo }) => {
    const newState = JSON.parse(JSON.stringify(todos));
    newState.splice(index, 1, todo);
    return newState;
  })
);
