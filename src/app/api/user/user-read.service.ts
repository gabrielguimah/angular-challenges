import { Injectable } from '@angular/core';
import { delay, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserReadService {

  constructor() { }

  get(userId: number) {
    return of({
      id: 1,
      name: 'Marcos'
    })
    .pipe(delay(500));
  }
}
