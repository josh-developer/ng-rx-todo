import { DatePipe } from '@angular/common';
import { AfterViewInit, Component } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { select, Store } from '@ngrx/store';
import { Chart } from 'chart.js';
import { AppState } from 'src/app/shared/interfaces/appState';
import { ITodo } from 'src/app/shared/interfaces/todo';

@UntilDestroy()
@Component({
  selector: 'week-chart',
  template: `
    <h2>Todos in next 7 days</h2>
    <div id="week-chart-container">
      <canvas id="week-chart"></canvas>
    </div>
  `,
  styles: [
    `
      @use '../../../styles/variables/colors';

      #week-chart-container {
        display: block;
        height: 400px;
        border: 5px solid colors.$primaryColor;
        border-radius: 7px;
      }
    `,
  ],
  providers: [DatePipe],
})
export class WeekChartComponent implements AfterViewInit {
  constructor(private store: Store<AppState>, private datePipe: DatePipe) {}

  ngAfterViewInit(): void {
    this.initChart();
  }

  initChart(): void {
    this.store
      .pipe(
        untilDestroyed(this),
        select((state) => state.todos)
      )
      .subscribe((todos) => {
        const { labels, todosData } = this.getChartsData(todos);
        const data = {
          labels: labels.reverse(),
          datasets: this.getDatasets(todosData),
        };

        new Chart('week-chart', {
          type: 'bar',
          data: data,
          options: {
            scales: {
              y: {
                ticks: {
                  stepSize: 1,
                },
              },
            },
            indexAxis: 'x',
            responsive: true,
            maintainAspectRatio: false,
          },
        });
      });
  }

  getChartsData(todos: ITodo[]): { labels: string[]; todosData: number[] } {
    let dateCount = 7; // week count
    const labels: string[] = [];
    // Stores todo counts by order for next 7 days
    let todosData: number[] = [];

    while (dateCount >= 1) {
      // Get formatted dates
      labels.push(this.datePipe.transform(this.getDayAfter(dateCount))!);
      // Get count of todos for this day
      const todoCountOfDay = todos.reduce((sum, todo) => {
        return new Date(todo.date).getDay() ===
          this.getDayAfter(dateCount).getDay()
          ? sum + 1
          : sum;
      }, 0);

      todosData.push(todoCountOfDay);
      dateCount--;
    }
    return { labels, todosData };
  }

  getDatasets(todosData: number[]) {
    return [
      {
        axis: 'y',
        label: 'Todos for 7 days',
        data: todosData,
        fill: false,
        backgroundColor: [
          'rgba(255, 99, 132, 0.4)',
          'rgba(255, 159, 64, 0.4)',
          'rgba(255, 205, 86, 0.4)',
          'rgba(75, 192, 192, 0.4)',
          'rgba(54, 162, 235, 0.4)',
          'rgba(153, 102, 255, 0.4)',
          'rgba(201, 203, 207, 0.4)',
        ],
        borderColor: [
          'rgb(255, 99, 132)',
          'rgb(255, 159, 64)',
          'rgb(255, 205, 86)',
          'rgb(75, 192, 192)',
          'rgb(54, 162, 235)',
          'rgb(153, 102, 255)',
          'rgb(201, 203, 207)',
        ],
        borderWidth: 1,
      },
    ];
  }

  getDayAfter(dateCount: number) {
    const today = new Date();
    return new Date(today.getTime() + dateCount * 24 * 60 * 60 * 1000);
  }
}
