import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router, Routes } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

import { UserEditDeleteService } from '@api/user/user-delete-service.service';
import { UserListServiceService } from '@api/user/user-list-service.service';
import { PoPageModule, PoTableComponent, PoTableModule } from '@po-ui/ng-components';
import { of } from 'rxjs';

import { UserEditPageComponent } from '../edit/user-edit-page';
import { UserNewPageComponent } from '../new/user-new-page';
import { UserListPageComponent } from './user-list-page';

const routes: Routes = [
  { path: '', component: UserListPageComponent },
  { path: 'new', component: UserNewPageComponent },
  { path: 'edit/:id', component: UserEditPageComponent }
];

const responseGetAll = {
  items: [{ id: 1, name: 'Marcos' }],
  hasNext: false
}

describe('UserListPageComponent', () => {
  let component: UserListPageComponent;
  let fixture: ComponentFixture<UserListPageComponent>;
  let nativeElement: HTMLElement
  let router: Router;
  let activatedRoute: ActivatedRoute;

  let userListServiceServiceSpy: jasmine.SpyObj<UserListServiceService>;
  let userEditDeleteServiceSpy: jasmine.SpyObj<UserEditDeleteService>;

  userListServiceServiceSpy = jasmine.createSpyObj('UserListServiceService', ['getAll'] );
  userListServiceServiceSpy.getAll.and.returnValue(of(responseGetAll));

  userEditDeleteServiceSpy = jasmine.createSpyObj('UserEditDeleteService', ['delete'] );
  userEditDeleteServiceSpy.delete.and.returnValue(of(null));

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes(routes),
        HttpClientTestingModule,
        PoPageModule,
        PoTableModule,
      ],
      declarations: [
        UserListPageComponent
      ],
      providers: [
        {
          provide: UserListServiceService,
          useValue: userListServiceServiceSpy,
        },
        {
          provide: UserEditDeleteService,
          useValue: userEditDeleteServiceSpy,
        }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserListPageComponent);
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
    const breadcumbsLabels = ['Home', 'User list'];

    // then
    for (let i = 0, len = breadcumbs.length; i < len; i++) {
      expect((breadcumbs[i] as HTMLElement).innerText).toBe(breadcumbsLabels[i]);
    }
  });

  it('Should navigate to add an users', () => {
    // given
    spyOn(router, 'navigate');
    const btnAdd = nativeElement.querySelector('po-button')?.querySelector('button');

    // when
    btnAdd?.dispatchEvent(new Event('click'));

    // then
    expect(router.navigate).toHaveBeenCalledWith(['users/new']);
  });

  it('Should users length to be 1', fakeAsync( async() => {
    // given
    await fixture.whenStable();
    userListServiceServiceSpy.getAll.calls.reset();
    const tableElement = nativeElement.querySelector('.po-table-wrapper');

    // when
    fixture.detectChanges();

    // then
    await fixture.whenStable();

    expect(tableElement?.querySelectorAll('.po-table-row').length).toBe(1);
  }));

  it('Should receive an user and navigate to the edit screen', () => {
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

  it('Should receive an user delete', () => {
    // given
    userEditDeleteServiceSpy.delete.and.returnValue(of(null));
    component.loading = true;

    // when
    component.tableActions[1].action?.call(component, responseGetAll.items[0]);

    // then
    expect(userEditDeleteServiceSpy.delete).toHaveBeenCalledWith(responseGetAll.items[0].id);
    expect(component.loading).toBe(false);
  });
});
