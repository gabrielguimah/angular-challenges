import { Component } from '@angular/core';

import { BroadcastService } from '@common/services/broadcast.service';
import { map } from 'rxjs';

@Component({
  selector: 'app-input-output-child-three',
  templateUrl: './child-three.component.html'
})
export class ChildThreeComponent {

  value = '';

  constructor(private readonly broadcastService: BroadcastService) {
    this.broadcastService.value
      .pipe(map(value => value.toLocaleLowerCase()))
      .subscribe(value => {
        this.value = value;
      });
  }

}
