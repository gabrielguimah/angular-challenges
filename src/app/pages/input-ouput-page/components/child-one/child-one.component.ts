import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-input-output-child-one',
  templateUrl: './child-one.component.html'
})
export class ChildOneComponent implements OnInit {

  @Input() value: string = '';
  @Output() transformedValue = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
  }

  sendNewValue() {
    this.transformedValue.emit(this.value.toUpperCase());
  }

}
