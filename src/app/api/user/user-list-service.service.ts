import { Injectable } from '@angular/core';
import { delay, of } from 'rxjs';

export type User = {
  id: number;
  name: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserListServiceService {

  private users: User[] = [
    { id: 1, name: 'Marcos' },
    { id: 2, name: 'Carlos' },
    { id: 3, name: 'Josóe' },
    { id: 4, name: 'Clara' },
    { id: 5, name: 'Cristina' },
    { id: 6, name: 'Maria' },
  ];

  constructor() { }

  getAll() {
    return of({
      items: this.users,
      hasNext: false
    })
    .pipe(
      delay(800)
    );
  }
}
