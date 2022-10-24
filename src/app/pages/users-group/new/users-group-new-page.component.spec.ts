import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { UsersGroupNewPageComponent } from './users-group-new-page.component';

describe('UsersGroupNewPageComponent', () => {
  let component: UsersGroupNewPageComponent;
  let fixture: ComponentFixture<UsersGroupNewPageComponent>;
  let router: Router;  let activatedRoute: ActivatedRoute;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        UsersGroupNewPageComponent
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

    fixture = TestBed.createComponent(UsersGroupNewPageComponent);
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
