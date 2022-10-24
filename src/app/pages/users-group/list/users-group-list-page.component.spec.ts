import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router, Routes } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

import { UsersGroupEditDeleteService } from '@api/users_group/users-group-delete-service.service';
import { UsersGroupListServiceService } from '@api/users_group/users-group-list-service.service';
import { PoTableComponent } from '@po-ui/ng-components';
import { of } from 'rxjs';

import { UsersGroupEditPageComponent } from './../edit/users-group-edit-page.component';
import { UsersGroupNewPageComponent } from './../new/users-group-new-page.component';
import { UsersGroupListPageComponent } from './users-group-list-page.component';

const routes: Routes = [
  { path: '', component: UsersGroupListPageComponent },
  { path: 'new', component: UsersGroupNewPageComponent },
  { path: 'edit/:id', component: UsersGroupEditPageComponent }
];

const responseGetAll = {
  items: [
    { id: 1, name: 'Atendentes', users: [
        { id: 1, name: 'Marcos' },
        { id: 2, name: 'Carlos' }
      ]
    },
  ],
  hasNext: false
}

describe('UsersGroupListPageComponent', () => {
  let component: UsersGroupListPageComponent;
  let fixture: ComponentFixture<UsersGroupListPageComponent>;
  let router: Router;
  let activatedRoute: ActivatedRoute;

  let usersGroupListServiceSpy: jasmine.SpyObj<UsersGroupListServiceService>;
  let usersGroupEditDeleteService: jasmine.SpyObj<UsersGroupEditDeleteService>;

  usersGroupListServiceSpy = jasmine.createSpyObj('UsersGroupListServiceService', ['getAll'] );
  usersGroupListServiceSpy.getAll.and.returnValue(of(responseGetAll));

  usersGroupEditDeleteService = jasmine.createSpyObj('UsersGroupEditDeleteService', ['delete'] );
  usersGroupEditDeleteService.delete.and.returnValue(of(null));

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes(routes),
      ],
      declarations: [
        UsersGroupListPageComponent
      ],
      providers: [
        {
          provide: UsersGroupListServiceService,
          useValue: usersGroupListServiceSpy,
        },
        {
          provide: UsersGroupEditDeleteService,
          useValue: usersGroupEditDeleteService,
        }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UsersGroupListPageComponent);
    router = TestBed.inject(Router);
    activatedRoute = TestBed.inject(ActivatedRoute);
    component = fixture.componentInstance;
    component.poTable = jasmine.createSpyObj<PoTableComponent>('PoTableComponent', ['removeItem']);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Should users groups length to be 1', () => {
    // given
    usersGroupListServiceSpy.getAll.calls.reset();

    // when
    expect(component.usersGroups).toBe(responseGetAll.items);
  });

  it('Should receive an users group and navigate to the edit screen', () => {
    // given
    spyOn(router, 'navigate');

    // when
    component.tableActions[0].action?.call(component, responseGetAll.items[0]);

    // then
    expect(router.navigate).toHaveBeenCalledWith(
      [`edit/${responseGetAll.items[0].id}`], {
      relativeTo: activatedRoute
    });
  });

  it('Should receive an users group delete', () => {
    // given
    usersGroupEditDeleteService.delete.and.returnValue(of(null));
    component.loading = true;

    // when
    component.tableActions[1].action?.call(component, responseGetAll.items[0]);

    // then
    expect(usersGroupEditDeleteService.delete).toHaveBeenCalledWith(responseGetAll.items[0].id);
    expect(component.loading).toBe(false);
  });
});
