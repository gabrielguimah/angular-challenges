import { Injectable } from '@angular/core';
import { delay, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersGroupReadService {

  constructor() { }

  get(usersGroupId: number) {
    return of({
      id: 1,
      name: 'Atendentes',
      users: [
        { id: 1, name: 'Marcos' },
        { id: 2, name: 'Carlos' }
      ]
    })
    .pipe(delay(500));
  }
}
