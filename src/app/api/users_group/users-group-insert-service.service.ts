import { Injectable } from '@angular/core';
import { delay, of } from 'rxjs';

export type NewUsersGroup = {
  name: string;
}

@Injectable({
  providedIn: 'root'
})
export class UsersGroupInsertServiceService {

  constructor() { }

  create(usersGroup: NewUsersGroup) {
    return of(null)
      .pipe(delay(600));
  }
}
