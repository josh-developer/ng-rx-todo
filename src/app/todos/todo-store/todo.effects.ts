import { Injectable } from "@angular/core";
import { Actions, ofType, createEffect } from "@ngrx/effects";
import { catchError, map, mergeMap, Observable, of, tap } from "rxjs";
import {
  addTodo,
  addTodoSuccess,
  editTodo,
  editTodoSuccess,
  removeTodo,
  removeTodoSuccess,
} from "./todo.actions";
import { ITodoResponse, TodoService } from "../services/todo.service";
import { AlertService } from "src/app/shared/alert/alert.service";
import { LoaderService } from "src/app/shared/loader/loader.service";
import { ITodo } from "src/app/shared/interfaces/todo";
import { ALERT, IAlert } from "src/app/shared/interfaces/alert";
import { Action } from "@ngrx/store";

@Injectable()
export class TodoEffects {
  addTodo = createEffect(() =>
    this.actions$.pipe(
      ofType(addTodo.type),
      mergeMap((data: { todo: ITodo; type: string }) =>
        this.effectOperators(
          data,
          this.todoService.addTodo.bind(this.todoService),
          addTodoSuccess
        )
      )
    )
  );

  deleteTodo = createEffect(() =>
    this.actions$.pipe(
      ofType(removeTodo),
      mergeMap((data: { index: number; todo: ITodo }) =>
        this.effectOperators(
          data,
          this.todoService.deleteTodo.bind(this.todoService),
          removeTodoSuccess
        )
      )
    )
  );

  editTodo = createEffect(() =>
    this.actions$.pipe(
      ofType(editTodo),
      mergeMap((data: { index: number; todo: ITodo }) =>
        this.effectOperators(
          data,
          this.todoService.editTodo.bind(this.todoService),
          editTodoSuccess
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private todoService: TodoService,
    private alertService: AlertService,
    private loaderService: LoaderService
  ) {}

  handleResponse(alert: IAlert) {
    this.loaderService.loader.next(false);
    this.alertService.alerts.next({ msg: alert.msg, type: alert.type });
  }

  catchReqError(errorMsg: IAlert) {
    this.handleResponse(errorMsg);
    return of();
  }

  // Fn overload for DeleteTodo
  public effectOperators(
    data: {
      index: number;
      todo: ITodo;
    },
    callback: (todo: ITodo) => Observable<ITodoResponse>,
    returnAction: typeof removeTodoSuccess
  ): Observable<Action>;

  // Fn overload for AddTodo
  public effectOperators(
    data: {
      type: string;
      todo: ITodo;
    },
    callback: (todo: ITodo) => Observable<ITodoResponse>,
    returnAction: typeof addTodoSuccess
  ): Observable<Action>;

  // Fn overload for EditTodo
  public effectOperators(
    data: {
      index: number;
      todo: ITodo;
    },
    callback: (todo: ITodo) => Observable<ITodoResponse>,
    returnAction: typeof editTodoSuccess
  ): Observable<Action>;

  public effectOperators(
    data: any,
    callback: (todo: any) => Observable<ITodoResponse>,
    returnAction: any
  ): Observable<Action> {
    return of(data).pipe(
      tap(() => this.loaderService.loader.next(true)),
      mergeMap(() =>
        callback(data.todo).pipe(
          map((response) => {
            this.handleResponse({ msg: response.msg, type: ALERT.Success });
            return returnAction(data);
          }),
          catchError((error: Error) =>
            this.catchReqError({ msg: error.message, type: ALERT.Error })
          )
        )
      )
    );
  }
}
