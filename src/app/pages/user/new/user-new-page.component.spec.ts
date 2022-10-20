import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { UserNewPageComponent } from './user-new-page.component';

describe('UserNewPageComponent', () => {
  let component: UserNewPageComponent;
  let fixture: ComponentFixture<UserNewPageComponent>;
  let router: Router;
  let activatedRoute: ActivatedRoute;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        UserNewPageComponent
      ],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {}
        },
        FormBuilder
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserNewPageComponent);
    router = TestBed.inject(Router);
    activatedRoute = TestBed.inject(ActivatedRoute);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();

    console.log('activatedRoute ->', activatedRoute);
    console.log('router ->', router);
  });
});