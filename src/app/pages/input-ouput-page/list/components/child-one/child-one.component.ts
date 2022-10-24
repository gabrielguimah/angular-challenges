import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-input-output-child-one',
  templateUrl: './child-one.component.html'
})
export class ChildOneComponent {

  @Input() value: string = '';
  @Output() transformedValue = new EventEmitter<string>();

  sendNewValue() {
    this.transformedValue.emit(this.value.toUpperCase());
  }

}
