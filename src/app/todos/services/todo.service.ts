import { Injectable } from '@angular/core';
import { delay, map, Observable, of } from 'rxjs';
import { IAlert, TODO_ALERTS } from 'src/app/shared/interfaces/alert';
import { ITodo } from 'src/app/shared/interfaces/todo';

export interface ITodoResponse {
  msg: string;
}

@Injectable({ providedIn: 'root' })
export class TodoService {
  isHttpError = true;
  readonly delayTime = 2000;

  constructor() { }

  addTodo(todo: ITodo): Observable<ITodoResponse> {
    return of<IAlert>({ msg: TODO_ALERTS.AddSuccessMsg(todo.title) }).pipe(
      delay(this.delayTime),
      this.mapResponse
    );
  }

  deleteTodo(todo: ITodo): Observable<ITodoResponse> {
    return of<IAlert>({ msg: TODO_ALERTS.DeleteSuccessMsg(todo.title) }).pipe(
      delay(this.delayTime),
      this.mapResponse
    );
  }

  editTodo(todo: ITodo): Observable<ITodoResponse> {
    return of<IAlert>({ msg: TODO_ALERTS.EditSuccessMsg(todo.title) }).pipe(
      delay(this.delayTime),
      this.mapResponse
    );
  }

  mapResponse = <T>(source: Observable<T>) =>
    source.pipe(
      map((response: any) => {
        this.isHttpError = !this.isHttpError;
        if (!this.isHttpError) {
          return response;
        }
        throw new Error(TODO_ALERTS.ErrorMsg());
      })
    );
}

