import { Injectable } from '@angular/core';
import { delay, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersGroupEditDeleteService {

  constructor() { }

  delete(usersGroupId: number) {
    return of(null).pipe(delay(700));
  }
}
