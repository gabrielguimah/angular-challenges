import { Component, OnInit } from '@angular/core';

import { BroadcastService } from '@core/services/broadcast.service';

@Component({
  selector: 'app-input-output-child-two',
  templateUrl: './child-two.component.html'
})
export class ChildTwoComponent implements OnInit {

  value = '';

  constructor(private readonly broadcastService: BroadcastService) {
    this.broadcastService.value
      .subscribe(value => {
        this.value = value;
      });
  }

  ngOnInit(): void {
  }




}
