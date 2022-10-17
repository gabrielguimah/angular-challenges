import { User } from './../user/user-list-service.service';
import { Injectable } from '@angular/core';
import { delay, of } from 'rxjs';

export type UsersGroup = {
  id: number;
  name: string;
  users: User[]
}

@Injectable({
  providedIn: 'root'
})
export class UsersGroupListServiceService {

  private usersGroup: UsersGroup[] = [
    { id: 1, name: 'Atendentes', users: [
        { id: 1, name: 'Marcos' },
        { id: 2, name: 'Carlos' }
      ]
    },
    { id: 2, name: 'Técnicos', users: [
        { id: 3, name: 'Josóe' },
        { id: 4, name: 'Clara' }
      ]
    },
    { id: 3, name: 'Administradores', users: [
        { id: 5, name: 'Cristina' },
        { id: 6, name: 'Maria' },
      ]
    }
  ];

  constructor() { }

  getAll() {
    return of({
      items: this.usersGroup,
      hasNext: false
    })
    .pipe(
      delay(800)
    );
  }
}
