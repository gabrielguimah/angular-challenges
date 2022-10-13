import { Component, OnInit, ViewChild } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { UserEditDeleteService } from "@api/user/user-delete-service.service";
import { User, UserListServiceService } from "@api/user/user-list-service.service";
import { PoBreadcrumb, PoPageAction, PoTableAction, PoTableColumn, PoTableComponent } from "@po-ui/ng-components";
import { finalize } from "rxjs";

@Component({
  selector: 'app-user-list-page',
  templateUrl: './user-list-page.component.html'
})
export class UserListPageComponent implements OnInit {

  @ViewChild(PoTableComponent, { static: true }) poTable!: PoTableComponent;

  loading = true;

  pageBreadcrumbs: PoBreadcrumb = {
    items: [
      { label: 'Home', link: '/' },
      { label: 'User list' }
    ]
  };

  pageActions: Array<PoPageAction> = [
    { label: 'New user', url: 'users/new' }
  ]

  users: Array<User>= [];

  tableColumns: Array<PoTableColumn> = [
    { label: 'Code', property: 'id' },
    { label: 'Name', property: 'name' },
  ];

  tableActions: Array<PoTableAction> = [
    { action: this.edit.bind(this), label: 'Edit' },
    { action: this.delete.bind(this), label: 'Delete' }
  ]

  private edit(row: User) {
    this.router.navigate([`edit/${row.id}`], { relativeTo: this.activatedRoute });
  }

  private delete(row: User) {
    this.loading = true;

    this.userEditDeleteService.delete(row.id)
      .pipe(finalize(() => this.loading = false))
      .subscribe(() => this.poTable.removeItem(row));
  }


  constructor(
    private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute,
    private readonly userListServiceService: UserListServiceService,
    private readonly userEditDeleteService: UserEditDeleteService,
  ) { }

  ngOnInit() {
    this.userListServiceService.getAll()
      .pipe(finalize(() => this.loading = false))
      .subscribe(users => {
        this.users = users.items;
      });
  }
}