import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AnalyticsComponent } from './analytics/analytics.component';
import { AddEditTodoComponent } from './todos/add-edit-todo/add-edit-todo.component';
import { TodoListsComponent } from './todos/todo-lists/todo-lists.component';
import { TodosComponent } from './todos/todos.component';

export const ROUTER_PARAMS = { id: 'id' } as const;
export const ROUTER_DATA = { isEdit: 'isEdit' } as const;

const routes: Routes = [
  {
    path: '',
    component: TodosComponent,
    children: [
      { path: '', redirectTo: 'todos', pathMatch: 'full' },
      { path: 'todos', component: TodoListsComponent },
      {
        path: 'add',
        component: AddEditTodoComponent,
        data: { [ROUTER_DATA.isEdit]: false },
      },
      {
        path: `edit/:${ROUTER_PARAMS.id}`,
        component: AddEditTodoComponent,
        data: { [ROUTER_DATA.isEdit]: true },
      },
      { path: 'analytics', component: AnalyticsComponent },
      { path: '**', redirectTo: 'todos' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
