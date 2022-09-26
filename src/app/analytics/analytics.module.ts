import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AnalyticsComponent } from "./analytics.component";
import { TodosChartComponent } from "./todos-chart/todos-chart.component";
import {
  Chart,
  ArcElement,
  BarElement,
  PointElement,
  BarController,
  DoughnutController,
  LinearScale,
  LogarithmicScale,
  RadialLinearScale,
  TimeScale,
  TimeSeriesScale,
  Decimation,
  Filler,
  Legend,
  Title,
  Tooltip,
  SubTitle,
  CategoryScale,
} from "chart.js";
import { WeekChartComponent } from "./week-chart/week-chart.component";

Chart.register(
  ArcElement,
  BarElement,
  PointElement,
  BarController,
  DoughnutController,
  LinearScale,
  LogarithmicScale,
  RadialLinearScale,
  TimeScale,
  TimeSeriesScale,
  CategoryScale,
  Decimation,
  Filler,
  Legend,
  Title,
  Tooltip,
  SubTitle
);

@NgModule({
  declarations: [AnalyticsComponent, TodosChartComponent, WeekChartComponent],
  imports: [CommonModule],
  exports: [TodosChartComponent],
})
export class AnalyticsModule {}
