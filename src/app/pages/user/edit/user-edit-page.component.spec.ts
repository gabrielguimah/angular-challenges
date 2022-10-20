import { ComponentFixture, TestBed } from "@angular/core/testing";
import { FormBuilder } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { UserEditPageComponent } from "./user-edit-page.component";

describe('UserEditPageComponent', () => {
  let component: UserEditPageComponent;
  let fixture: ComponentFixture<UserEditPageComponent>;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        UserEditPageComponent
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

    fixture = TestBed.createComponent(UserEditPageComponent);
    router = TestBed.inject(Router);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();

    console.log('router ->', router);
  });
});