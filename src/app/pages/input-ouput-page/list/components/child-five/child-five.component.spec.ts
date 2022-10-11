import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChildFiveComponent } from './child-five.component';

describe('ChildFiveComponent', () => {
  let component: ChildFiveComponent;
  let fixture: ComponentFixture<ChildFiveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChildFiveComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChildFiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
