import { Injectable } from "@angular/core";
import { ReplaySubject } from "rxjs";
import { IAlert } from "../interfaces/alert";

@Injectable({ providedIn: "root" })
export class AlertService {
  alerts = new ReplaySubject<IAlert>(1);
  constructor() {}
}
