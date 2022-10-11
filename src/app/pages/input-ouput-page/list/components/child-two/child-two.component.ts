import { Component, OnInit } from '@angular/core';

import { BroadcastService } from '@common/services/broadcast.service';
import { map } from 'rxjs';

@Component({
  selector: 'app-input-output-child-two',
  templateUrl: './child-two.component.html'
})
export class ChildTwoComponent implements OnInit {

  value = '';

  constructor(private readonly broadcastService: BroadcastService) {
    this.broadcastService.value
      .pipe(map(value => value.toUpperCase()))
      .subscribe(value => {
        this.value = value;
      });
  }

  ngOnInit(): void {
  }




}
