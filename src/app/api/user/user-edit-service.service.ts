import { Injectable } from '@angular/core';
import { delay, of } from 'rxjs';
import { User } from './user-list-service.service';

@Injectable({
  providedIn: 'root'
})
export class UserEditServiceService {

  constructor() { }

  update(user: User) {
    return of(null)
      .pipe(delay(600));
  }
}
