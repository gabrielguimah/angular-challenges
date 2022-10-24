import { ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserInsertServiceService } from '@api/user/user-insert-service.service';
import { PoContainerModule, PoFieldModule, PoPageModule } from '@po-ui/ng-components';
import { of } from 'rxjs';

import { UserNewPageComponent } from './user-new-page';

describe('UserNewPageComponent', () => {
  let component: UserNewPageComponent;
  let fixture: ComponentFixture<UserNewPageComponent>;
  let nativeElement: HTMLElement
  let router: Router;
  let activatedRoute: ActivatedRoute;
  let userInsertServiceServiceSpy: jasmine.SpyObj<UserInsertServiceService>;

  userInsertServiceServiceSpy = jasmine.createSpyObj('UserInsertServiceService', ['create'] );
  userInsertServiceServiceSpy.create.and.returnValue(of(null));


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        FormsModule,
        PoPageModule,
        PoFieldModule,
        PoContainerModule
      ],
      declarations: [
        UserNewPageComponent
      ],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {}
        },
        {
          provide: UserInsertServiceService,
          useValue: userInsertServiceServiceSpy,
        },
        FormBuilder
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserNewPageComponent);
    router = TestBed.inject(Router);
    activatedRoute = TestBed.inject(ActivatedRoute);
    component = fixture.componentInstance;
    nativeElement = fixture.debugElement.nativeElement;

    fixture.detectChanges();
  });

  it('should create', () => {
    const btnSave = nativeElement.querySelectorAll('po-button')[1].querySelector('button') as HTMLButtonElement;

    expect(component).toBeTruthy();
    expect(btnSave.disabled).toBe(true);
  });

  it('Should check breadcumbs', () => {
    // given
    const breadcumbs = nativeElement.querySelectorAll('po-breadcrumb-item');
    const breadcumbsLabels = ['Home', 'Users', 'New'];

    // then
    for (let i = 0, len = breadcumbs.length; i < len; i++) {
      expect((breadcumbs[i] as HTMLElement).innerText).toBe(breadcumbsLabels[i]);
    }
  });

  it('Should cancel and navigate to user list', () => {
    // given
    spyOn(router, 'navigate');
    const btnBack = nativeElement.querySelectorAll('po-button')[0].querySelector('button') as HTMLButtonElement;

    // when
    btnBack.dispatchEvent(new Event('click'));

    // then
    expect(router.navigate).toHaveBeenCalledWith(['/users']);
  });

  it('Should add a valid user' , fakeAsync(async() => {
    // given
    const input = nativeElement.querySelector('#newUser')?.querySelector('input') as HTMLInputElement;
    const btnSave = nativeElement.querySelectorAll('po-button')[1].querySelector('button') as HTMLButtonElement;


    // when
    await fixture.whenStable();
    input.value = 'Marcos';
    input?.dispatchEvent(new Event('input'))
    fixture.detectChanges();

    // then
    await fixture.whenStable();
    expect(btnSave.disabled).toBe(false);
  }));

  it('Should save a new user', fakeAsync(async() => {
    // given
    userInsertServiceServiceSpy.create.calls.reset();
    spyOn(router, 'navigate');
    const input = nativeElement.querySelector('#newUser')?.querySelector('input')  as HTMLInputElement;
    const btnSave = nativeElement.querySelectorAll('po-button')[1].querySelector('button') as HTMLButtonElement;


    // when
    await fixture.whenStable();
    input.value = 'Marcos';
    input?.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    await fixture.whenStable();
    btnSave.dispatchEvent(new Event('click'));

    // then
    expect(userInsertServiceServiceSpy.create).toHaveBeenCalledWith({ name: 'Marcos' });
    expect(router.navigate).toHaveBeenCalledWith(['../'], { relativeTo: activatedRoute });
  }));
});