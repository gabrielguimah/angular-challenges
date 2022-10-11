import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class BroadcastService {
  public readonly value: BehaviorSubject<string> = new BehaviorSubject<string>('');
}