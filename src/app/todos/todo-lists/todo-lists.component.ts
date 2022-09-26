import { Component, OnInit } from "@angular/core";
import { select, Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { AppState } from "src/app/shared/interfaces/appState";
import { ITodo } from "src/app/shared/interfaces/todo";

@Component({
  selector: "todo-lists",
  templateUrl: "./todo-lists.component.html",
  styleUrls: ["./todo-lists.component.scss"],
})
export class TodoListsComponent implements OnInit {
  todos!: Observable<ITodo[]>;

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.todos = this.store.pipe(select((state) => state.todos));
  }
}
