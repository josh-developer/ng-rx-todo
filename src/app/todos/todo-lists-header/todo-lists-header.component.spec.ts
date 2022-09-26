import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoListsHeaderComponent } from './todo-lists-header.component';

describe('TodoListsHeaderComponent', () => {
  let component: TodoListsHeaderComponent;
  let fixture: ComponentFixture<TodoListsHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TodoListsHeaderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TodoListsHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
