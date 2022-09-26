import { Component } from '@angular/core';

@Component({
  selector: 'analytics',
  template: `
    <todos-chart></todos-chart>
    <hr />
    <week-chart> </week-chart>
  `,
})
export class AnalyticsComponent {
  constructor() {}
}
