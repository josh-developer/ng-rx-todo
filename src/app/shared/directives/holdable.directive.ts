import { Directive, EventEmitter, HostListener, Output } from "@angular/core";
import { filter, interval, Observable, Subject, takeUntil, tap } from "rxjs";

@Directive({
  selector: "[holdable]",
})
export class HoldableDirective {
  @Output() holdTime = new EventEmitter<number>();

  state = new Subject<string>();

  cancel!: Observable<string>;

  constructor() {
    this.cancel = this.state.pipe(
      filter((v) => v === "cancel"),
      tap((v) => {
        console.log("stopped hold ");
        this.holdTime.emit(0);
      })
    );
  }

  @HostListener("mouseup", ["$event"])
  @HostListener("mouseleave", ["$event"])
  onExit() {
    this.state.next("cancel");
  }

  @HostListener("mousedown", ["$event"]) onHold() {
    console.log("%c started hold", "color: #5fba7d; font-weight: bold;");

    const n = 100;

    interval(n)
      .pipe(
        takeUntil(this.cancel),
        tap((v: number) =>
          v > 10 ? this.holdTime.emit(0) : this.holdTime.emit(v * n)
        )
      )
      .subscribe();
  }
}
