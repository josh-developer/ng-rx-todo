import { NgModule } from '@angular/core';
import { TodosComponent } from './todos.component';
import { TodoListsHeaderComponent } from './todo-lists-header/todo-lists-header.component';
import { TodoListsComponent } from './todo-lists/todo-lists.component';
import { TodoItemComponent } from './todo-lists/todo-item/todo-item.component';
import { AddEditTodoComponent } from './add-edit-todo/add-edit-todo.component';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    TodosComponent,
    TodoListsHeaderComponent,
    TodoListsComponent,
    TodoItemComponent,
    AddEditTodoComponent
  ],
  imports: [
    SharedModule,
    RouterModule,
    ReactiveFormsModule
  ]
})
export class TodosModule { }
