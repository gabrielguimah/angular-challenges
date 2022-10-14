import { Component } from "@angular/core";
import { UntypedFormBuilder, UntypedFormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";

import { PoBreadcrumb, PoPageAction } from "@po-ui/ng-components";

import { UserEditServiceService } from "@api/user/user-edit-service.service";
import { User } from "@api/user/user-list-service.service";
import { UserReadService } from "@api/user/user-read.service";

@Component({
  selector: 'app-user-edit-page',
  templateUrl: './user-edit-page.component.html'
})
export class UserEditPageComponent {

  user: User = {} as User;

  reactiveForm!: UntypedFormGroup;

  pageBreadcrumbs: PoBreadcrumb = {
    items: [
      { label: 'Home', link: '/' },
      { label: 'Users', link: '/users' },
      { label: 'Edit' }
    ]
  };

  pageActions: Array<PoPageAction> = [
    { label: 'Save', url: '/users' },
    { label: 'Back', url: '/users' }
  ]

  constructor(
    private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute,
    private readonly fb: UntypedFormBuilder,
    private readonly userReadService: UserReadService,
    private readonly userEditServiceService: UserEditServiceService
  ) {
    this.createReactiveForm();
  }

  ngOnInit() {
    this.userReadService.get(this.activatedRoute.snapshot.data['id'])
      .pipe()
      .subscribe({
        next: (user) => {
          this.user = user;
          this.reactiveForm.patchValue({
            id: user.id,
            name: user.name
          });
        },
        error: () => {
          this.router.navigate(['../../'], { relativeTo: this.activatedRoute });
        }
      });
  };

  createReactiveForm() {
    this.reactiveForm = this.fb.group({
      id: [''],
      name: ['', Validators.compose([Validators.required, Validators.minLength(5), Validators.maxLength(30)])]
    });
  };

  save() {
    this.userEditServiceService.update(this.reactiveForm.getRawValue())
      .subscribe(() => {
        this.router.navigate(['../../'], { relativeTo: this.activatedRoute });
      });
  }
}
