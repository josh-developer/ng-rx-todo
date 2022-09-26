import { createAction, props } from '@ngrx/store';
import { ITodo } from '../../shared/interfaces/todo';

export const addTodo = createAction('[Todo] add', props<{ todo: ITodo }>());
export const addTodoSuccess = createAction(
  '[Todo] add success',
  props<{ todo: ITodo }>()
);
export const removeTodo = createAction(
  '[Todo] remove',
  props<{ index: number; todo: ITodo }>()
);
export const removeTodoSuccess = createAction(
  '[Todo] remove success',
  props<{ index: number; todo: ITodo }>()
);
export const editTodo = createAction(
  '[Todo] edit',
  props<{ index: number; todo: ITodo }>()
);
export const editTodoSuccess = createAction(
  '[Todo] edit success',
  props<{ index: number; todo: ITodo }>()
);
