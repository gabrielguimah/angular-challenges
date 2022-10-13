import { Injectable } from '@angular/core';
import { delay, of } from 'rxjs';

export type NewUser = {
  name: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserInsertServiceService {

  constructor() { }

  create(user: NewUser) {
    return of(null)
      .pipe(delay(600));
  }
}
