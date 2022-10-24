import { of } from 'rxjs';
import { UsersGroupEditPageComponent } from './users-group-edit-page.component';
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { FormBuilder } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";

import { UsersGroupReadService } from '@api/users_group/users-group-read.service';

const responseGetAll = {
  id: 1, name: 'Atendentes', users: [
    { id: 1, name: 'Marcos' },
    { id: 2, name: 'Carlos' }
  ]
}

describe('UserEditPageComponent', () => {
  let component: UsersGroupEditPageComponent;
  let fixture: ComponentFixture<UsersGroupEditPageComponent>;
  let router: Router;

  let usersGroupReadServiceSpy: jasmine.SpyObj<UsersGroupReadService>;

  usersGroupReadServiceSpy = jasmine.createSpyObj('UsersGroupEditDeleteService', ['get'] );
  usersGroupReadServiceSpy.get.and.returnValue(of(responseGetAll));

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        UsersGroupEditPageComponent
      ],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { snapshot: { data: { id: '6a73abaa-dd1c-40c3-a6c1-04bee2779db6' } } },
        },
        {
          provide: UsersGroupReadService,
          useValue: usersGroupReadServiceSpy
        },
        FormBuilder
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UsersGroupEditPageComponent);
    router = TestBed.inject(Router);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();

    console.log('router ->', router);
  });

  it('Should have, at least, 1 user in the group', () => {
    // given
    usersGroupReadServiceSpy.get.calls.reset();

    // when
    expect(component.users.length).toBeTruthy();
  });
});
