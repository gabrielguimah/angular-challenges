import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChildFiveComponent } from './components/child-five/child-five.component';

import { InputOutputListPageComponent } from './input-output-list-page';

describe('InputOutputListPageComponent', () => {
  let component: InputOutputListPageComponent;
  let fixture: ComponentFixture<InputOutputListPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        InputOutputListPageComponent,
        ChildFiveComponent
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InputOutputListPageComponent);
    component = fixture.componentInstance;
    component.childFive = jasmine.createSpyObj<ChildFiveComponent>('ChildFiveComponent', { value: '' });
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set valueChildOne when call inputOneValue', () => {
    component.inputOneValue('value1');

    expect(component.valueChildOne).toBe('value1');
  });

  it('should emit a value when call changeInputValue', () => {
    component.changeInputValue('value1');

    fixture.detectChanges();

    expect(component.childFive.value).toBe('value1');
  });
});
