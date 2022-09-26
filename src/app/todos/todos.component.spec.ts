import { ComponentFixture, TestBed } from "@angular/core/testing";

import { provideMockStore } from "@ngrx/store/testing";
import { TodosComponent } from "./todos.component";

describe("TodosComponent", () => {
  let component: TodosComponent;
  let fixture: ComponentFixture<TodosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TodosComponent],
      providers: [provideMockStore({})],
    }).compileComponents();

    fixture = TestBed.createComponent(TodosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
