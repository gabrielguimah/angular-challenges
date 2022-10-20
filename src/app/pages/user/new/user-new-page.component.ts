import { Component, OnInit } from "@angular/core";
import { FormBuilder, UntypedFormGroup, Validators } from "@angular/forms";

import { PoBreadcrumb, PoPageAction } from "@po-ui/ng-components";

import { ActivatedRoute, Router } from "@angular/router";
import { UserInsertServiceService } from "@api/user/user-insert-service.service";

@Component({
  selector: 'app-user-new-page',
  templateUrl: './user-new-page.component.html'
})
export class UserNewPageComponent implements OnInit {

  pageBreadcrumbs: PoBreadcrumb = {
    items: [
      { label: 'Home', link: '/' },
      { label: 'Users', link: '/users' },
      { label: 'New' }
    ]
  };

  pageActions: Array<PoPageAction> = [
    { label: 'Save', action: this.save.bind(this), disabled: true },
    { label: 'Back', url: '/users' }
  ]

  reactiveForm!: UntypedFormGroup;

  constructor(
    private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private userInsertServiceService: UserInsertServiceService
  ) {
    this.createReactiveForm();
  };

  ngOnInit() {
    this.reactiveForm.statusChanges.subscribe(status => {
      this.pageActions[0].disabled = status === 'INVALID';
    });
  };

  createReactiveForm() {
    this.reactiveForm = this.fb.group({
      name: ['', Validators.compose([Validators.required, Validators.minLength(5), Validators.maxLength(30)])]
    });
  };

  save() {
    this.userInsertServiceService.create(this.reactiveForm.getRawValue())
      .subscribe(() => {
        this.router.navigate([`../`], { relativeTo: this.activatedRoute });
      });
  }
}