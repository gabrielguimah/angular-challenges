import { UsersGroupEditPageComponent } from './users-group-edit-page.component';
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { FormBuilder } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";



describe('UserEditPageComponent', () => {
  let component: UsersGroupEditPageComponent;
  let fixture: ComponentFixture<UsersGroupEditPageComponent>;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        UsersGroupEditPageComponent
      ],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { snapshot: { data: { id: '6a73abaa-dd1c-40c3-a6c1-04bee2779db6' } } }
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
});
