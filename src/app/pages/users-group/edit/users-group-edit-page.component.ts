import { UsersGroupReadService } from './../../../api/users_group/users-group-read.service';
import { UsersGroupEditServiceService } from './../../../api/users_group/users-group-edit-service.service';
import { UsersGroup } from './../../../api/users_group/users-group-list-service.service';
import { Component } from "@angular/core";
import { UntypedFormBuilder, UntypedFormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";

import { PoBreadcrumb, PoPageAction, PoTableColumn } from "@po-ui/ng-components";

@Component({
  selector: 'app-users-group-edit-page',
  templateUrl: './users-group-edit-page.component.html'
})
export class UsersGroupEditPageComponent {

  usersGroup: UsersGroup = {} as UsersGroup;

  users: any[] = []

  loading = true;

  reactiveForm!: UntypedFormGroup;

  pageBreadcrumbs: PoBreadcrumb = {
    items: [
      { label: 'Home', link: '/' },
      { label: 'Users Groups', link: '/users_groups' },
      { label: 'Edit' }
    ]
  };

  pageActions: Array<PoPageAction> = [
    { label: 'Save', url: '/users_groups' },
    { label: 'Back', url: '/users_groups' }
  ]

  tableColumns: Array<PoTableColumn> = [
    { label: 'Code', property: 'id' },
    { label: 'Name', property: 'name' },
  ];

  constructor(
    private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute,
    private readonly fb: UntypedFormBuilder,
    private readonly usersGroupReadService: UsersGroupReadService,
    private readonly usersGroupEditServiceService: UsersGroupEditServiceService
  ) {
    this.createReactiveForm();
  }

  ngOnInit() {
    this.usersGroupReadService.get(this.activatedRoute.snapshot.data['id'])
      .pipe()
      .subscribe({
        next: (usersGroup) => {
          this.usersGroup = usersGroup;
          this.reactiveForm.patchValue({
            id: usersGroup.id,
            name: usersGroup.name
          });
          this.users = usersGroup.users;
          this.loading = false;
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
    this.usersGroupEditServiceService.update(this.reactiveForm.getRawValue())
      .subscribe(() => {
        this.router.navigate(['../../'], { relativeTo: this.activatedRoute });
      });
  }
}
