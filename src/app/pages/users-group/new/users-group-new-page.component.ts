import { UsersGroupInsertServiceService } from './../../../api/users_group/users-group-insert-service.service';
import { Component, OnInit } from "@angular/core";
import { UntypedFormBuilder, UntypedFormGroup, Validators } from "@angular/forms";

import { PoBreadcrumb, PoPageAction } from "@po-ui/ng-components";

import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: 'app-users-group-new-page',
  templateUrl: './users-group-new-page.component.html'
})
export class UsersGroupNewPageComponent implements OnInit {

  pageBreadcrumbs: PoBreadcrumb = {
    items: [
      { label: 'Home', link: '/' },
      { label: 'Users Groups', link: '/users_groups' },
      { label: 'New' }
    ]
  };

  pageActions: Array<PoPageAction> = [
    { label: 'Save', action: this.save.bind(this), disabled: true },
    { label: 'Back', url: '/users_groups' }
  ]

  reactiveForm!: UntypedFormGroup;

  constructor(
    private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute,
    private fb: UntypedFormBuilder,
    private usersGroupInsertServiceService: UsersGroupInsertServiceService
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
    this.usersGroupInsertServiceService.create(this.reactiveForm.getRawValue())
      .subscribe(() => {
        this.router.navigate([`../`], { relativeTo: this.activatedRoute });
      });
  }
}
