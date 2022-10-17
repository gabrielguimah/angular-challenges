import { Injectable } from '@angular/core';
import { delay, of } from 'rxjs';
import { UsersGroup } from './users-group-list-service.service';

@Injectable({
  providedIn: 'root'
})
export class UsersGroupEditServiceService {

  constructor() { }

  update(usersGroup: UsersGroup) {
    return of(null)
      .pipe(delay(600));
  }
}
