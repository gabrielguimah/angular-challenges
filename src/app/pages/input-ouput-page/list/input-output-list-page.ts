import { Component, ViewChild } from '@angular/core';
import { PoBreadcrumb } from '@po-ui/ng-components';

import { BroadcastService } from '@common/services/broadcast.service';
import { ChildFiveComponent } from './components/child-five/child-five.component';

@Component({
  selector: 'app-input-output-page',
  templateUrl: './input-output-list-page.html'
})
export class InputOutputListPageComponent {

  @ViewChild(ChildFiveComponent, { static: true }) childFive!: ChildFiveComponent;

  public readonly breadcrumbs: PoBreadcrumb = {
    items: [
      { label: 'Home', link: '/' },
      { label: 'Input Output' }
    ]
  };

  inputValue = '';

  valueChildOne = '';

  constructor(private readonly broadcastService: BroadcastService) { }

  inputOneValue(value: string) {
    this.valueChildOne = value;
  }

  changeInputValue(value: string) {
    this.broadcastService.value.next(value);

    this.childFive.value = value;
  }

}
