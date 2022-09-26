import { Component, OnInit } from "@angular/core";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";
import { select, Store } from "@ngrx/store";
import { Chart } from "chart.js";
import { AppState } from "src/app/shared/interfaces/appState";

@UntilDestroy()
@Component({
  selector: "todos-chart",
  template: `
    <h2>Completed and new todos</h2>
    <div id="todos-chart-container">
      <canvas id="todos-chart"></canvas>
    </div>
  `,
  styles: [
    `
      @use "../../../styles/variables/colors";

      #todos-chart-container {
        display: block;
        height: 400px;
        border: 5px solid colors.$primaryColor;
        border-radius: 7px;
      }
    `,
  ],
})
export class TodosChartComponent implements OnInit {
  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.initChart();
  }

  initChart(): void {
    this.store
      .pipe(
        untilDestroyed(this),
        select((state) => state.todos)
      )
      .subscribe((todos) => {
        const completedTodosCount = todos.filter(
          (todo) => todo.completed
        )?.length;
        const newTodosCount = todos.filter((todo) => !todo.completed)?.length;

        new Chart("todos-chart", {
          type: "doughnut",
          data: {
            labels: ["Completed", "New"],
            datasets: [
              {
                label: "Completed todos",
                data: [completedTodosCount, newTodosCount],
                borderColor: ["rgb(255, 99, 132)", "rgb(255, 99, 132)"],
                backgroundColor: [
                  "rgba(0, 255, 20, 0.6)",
                  "rgba(0, 25, 220, 0.6)",
                ],
              },
            ],
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
          },
        });
      });
  }
}
