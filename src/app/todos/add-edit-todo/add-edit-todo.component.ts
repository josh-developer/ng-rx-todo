import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { select, Store } from "@ngrx/store";
import { take } from "rxjs";
import { ROUTER_DATA, ROUTER_PARAMS } from "src/app/app-routing.module";
import { AppState } from "src/app/shared/interfaces/appState";
import { ITodo } from "src/app/shared/interfaces/todo";
import { addTodo, editTodo } from "src/app/todos/todo-store/todo.actions";

@Component({
  selector: "add-edit-todo",
  templateUrl: "./add-edit-todo.component.html",
  styleUrls: ["./add-edit-todo.component.scss"],
})
export class AddEditTodoComponent implements OnInit {
  todoForm!: FormGroup;
  isEdit = false;
  todoIndex!: number;

  constructor(
    private store: Store<AppState>,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.isEdit = this.route.snapshot.data[ROUTER_DATA.isEdit];
    this.todoForm = this.fb.group({
      title: ["", Validators.required],
      desc: ["", Validators.required],
      date: ["00/00/0000", Validators.required],
    });

    this.todoIndex = this.route.snapshot.params[ROUTER_PARAMS.id];
    if (this.isEdit) {
      this.getTodoByIndex();
    }
  }

  getTodoByIndex(): void {
    this.store
      .pipe(
        select((state) => state.todos),
        take(1)
      )
      .subscribe((todos) => {
        if (todos[this.todoIndex]) {
          this.todoForm.setValue(todos[this.todoIndex]);
        } else {
          this.router.navigateByUrl("/");
        }
      });
  }

  addTodo(todo: ITodo): void {
    this.store.dispatch(addTodo({ todo }));
  }

  editTodo(newState: { index: number; todo: ITodo }): void {
    this.store.dispatch(editTodo(newState));
  }

  submitForm(): void {
    if (this.todoForm.invalid) {
      return;
    }
    this.isEdit
      ? this.editTodo({ index: this.todoIndex, todo: this.todoForm.value })
      : this.addTodo(this.todoForm.value);

    this.router.navigate(["/todos"]);
  }
}
