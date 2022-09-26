import { NgModule } from "@angular/core";
import { StoreModule } from "@ngrx/store";
import { BrowserModule } from "@angular/platform-browser";
import { AppRoutingModule } from "./app-routing.module";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { StoreDevtoolsModule } from "@ngrx/store-devtools";

import { TodosModule } from "./todos/todos.module";
import { EffectsModule } from "@ngrx/effects";

import { AppComponent } from "./app.component";
import { environment } from "../environments/environment";
import { reducers } from "./store/reducers";
import { TodoEffects } from "./todos/todo-store/todo.effects";
import { HttpClientModule } from "@angular/common/http";
import { AnalyticsModule } from "./analytics/analytics.module";
import { HoldableDirective } from "./shared/directives/holdable.directive";

@NgModule({
  declarations: [AppComponent, HoldableDirective],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    TodosModule,
    AnalyticsModule,
    StoreModule.forRoot(reducers),
    EffectsModule.forRoot([TodoEffects]),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production,
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
