import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { TodosChartComponent } from './todos-chart.component';

describe('TodosChartComponent', () => {
  let component: TodosChartComponent;
  let fixture: ComponentFixture<TodosChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TodosChartComponent],
      providers: [provideMockStore({})],
    }).compileComponents();

    fixture = TestBed.createComponent(TodosChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
