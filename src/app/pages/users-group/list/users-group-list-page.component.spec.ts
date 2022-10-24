import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router, Routes } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

import { UsersGroupEditDeleteService } from '@api/users_group/users-group-delete-service.service';
import { UsersGroupListServiceService } from '@api/users_group/users-group-list-service.service';
import { PoPageModule, PoTableComponent, PoTableModule } from '@po-ui/ng-components';
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
  let nativeElement: HTMLElement
  let router: Router;
  let activatedRoute: ActivatedRoute;

  let usersGroupListServiceServiceSpy: jasmine.SpyObj<UsersGroupListServiceService>;
  let usersGroupEditDeleteServiceSpy: jasmine.SpyObj<UsersGroupEditDeleteService>;

  usersGroupListServiceServiceSpy = jasmine.createSpyObj('UsersGroupListServiceService', ['getAll'] );
  usersGroupListServiceServiceSpy.getAll.and.returnValue(of(responseGetAll));

  usersGroupEditDeleteServiceSpy = jasmine.createSpyObj('UserEditDeleteService', ['delete'] );
  usersGroupEditDeleteServiceSpy.delete.and.returnValue(of(null));

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes(routes),
        HttpClientTestingModule,
        PoPageModule,
        PoTableModule,
      ],
      declarations: [
        UsersGroupListPageComponent
      ],
      providers: [
        {
          provide: UsersGroupListServiceService,
          useValue: usersGroupListServiceServiceSpy,
        },
        {
          provide: UsersGroupEditDeleteService,
          useValue: usersGroupEditDeleteServiceSpy,
        }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UsersGroupListPageComponent);
    router = TestBed.inject(Router);
    activatedRoute = TestBed.inject(ActivatedRoute);
    component = fixture.componentInstance;
    nativeElement = fixture.debugElement.nativeElement;
    component.poTable = jasmine.createSpyObj<PoTableComponent>('PoTableComponent', ['removeItem']);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Should check breadcumbs', () => {
    // given
    const breadcumbs = nativeElement.querySelectorAll('po-breadcrumb-item');
    const breadcumbsLabels = ['Home', 'Users Group list'];

    // then
    for (let i = 0, len = breadcumbs.length; i < len; i++) {
      expect((breadcumbs[i] as HTMLElement).innerText).toBe(breadcumbsLabels[i]);
    }
  });

  it('Should navigate to add an users group', () => {
    // given
    spyOn(router, 'navigate');
    const btnAdd = nativeElement.querySelector('po-button')?.querySelector('button');

    // when
    btnAdd?.dispatchEvent(new Event('click'));

    // then
    expect(router.navigate).toHaveBeenCalledWith(['users_groups/new']);
  });

  it('Should users length be 1', fakeAsync( async() => {
    // given
    await fixture.whenStable();
    usersGroupListServiceServiceSpy.getAll.calls.reset();
    const tableElement = nativeElement.querySelector('.po-table-wrapper');

    // when
    fixture.detectChanges();

    // then
    await fixture.whenStable();

    expect(tableElement?.querySelectorAll('.po-table-row').length).toBe(1);
  }));

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

  it('Should receive an users group to delete', () => {
    // given
    usersGroupEditDeleteServiceSpy.delete.and.returnValue(of(null));
    component.loading = true;

    // when
    component.tableActions[1].action?.call(component, responseGetAll.items[0]);

    // then
    expect(usersGroupEditDeleteServiceSpy.delete).toHaveBeenCalledWith(responseGetAll.items[0].id);
    expect(component.loading).toBe(false);
  });
});
