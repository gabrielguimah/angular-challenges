import { Component } from '@angular/core';

import { BroadcastService } from '@common/services/broadcast.service';
import { map } from 'rxjs';

@Component({
  selector: 'app-input-output-child-two',
  templateUrl: './child-two.component.html'
})
export class ChildTwoComponent {

  value = '';

  constructor(private readonly broadcastService: BroadcastService) {
    this.broadcastService.value
      .pipe(map(value => value.toUpperCase()))
      .subscribe(value => {
        this.value = value;
      });
  }

}
