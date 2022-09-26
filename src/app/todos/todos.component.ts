import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { LoaderService } from "../shared/loader/loader.service";

@Component({
  selector: "todos",
  template: `
    <div id="todos-wrapper">
      <todo-lists-header></todo-lists-header>
      <mat-spinner
        [diameter]="55"
        *ngIf="loaderService.loader | async"
      ></mat-spinner>

      <div id="lists-wrapper" *ngIf="!(loaderService.loader | async)">
        <router-outlet></router-outlet>
      </div>
    </div>
  `,
  styles: [
    `
      @use "../../styles/variables/sizes";

      $spinnerSize: var(--spinnerSize);

      #lists-wrapper {
        padding: 15px 10px;
        overflow: auto;
        height: calc(sizes.$mainContentHeight - sizes.$headerHeight - 30px);
      }
      mat-spinner {
        position: absolute;
        top: calc(50% - 27.5px);
        left: calc(50% - 27.5px);
      }
    `,
  ],
})
export class TodosComponent {
  constructor(protected loaderService: LoaderService) {}
}
