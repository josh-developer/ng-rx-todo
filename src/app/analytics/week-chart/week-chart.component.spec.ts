import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { WeekChartComponent } from './week-chart.component';

describe('WeekChartComponent', () => {
  let component: WeekChartComponent;
  let fixture: ComponentFixture<WeekChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WeekChartComponent],
      providers: [provideMockStore({})],
    }).compileComponents();

    fixture = TestBed.createComponent(WeekChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
