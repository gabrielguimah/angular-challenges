import { Component, OnInit } from '@angular/core';
import { PoBreadcrumb } from '@po-ui/ng-components';

import { BroadcastService } from '@core/services/broadcast.service';

@Component({
  selector: 'app-input-output-page',
  templateUrl: './input-output-page.component.html'
})
export class InputOutputPageComponent implements OnInit {

  // @ViewChild(ChildFiveComponent, { static: true }) childFive!: ChildFiveComponent;

  public readonly breadcrumbs: PoBreadcrumb = {
    items: [
      { label: 'Home', link: '/' },
      { label: 'Input Output' }
    ]
  };

  inputValue = '';

  valueChildOne = '';

  constructor(private readonly broadcastService: BroadcastService) { }

  ngOnInit(): void {
  }

  inputOneValue(value: string) {
    this.valueChildOne = value;
  }

  changeInputValue(value: string) {
    this.broadcastService.value.next(value);
  }

}
