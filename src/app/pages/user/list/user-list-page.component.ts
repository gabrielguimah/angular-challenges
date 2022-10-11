import { Component, OnInit, ViewChild } from "@angular/core";
import { UserEditDeleteService } from "@api/user/user-delete-service.service";
import { User, UserListServiceService } from "@api/user/user-list-service.service";
import { PoBreadcrumb, PoTableAction, PoTableColumn, PoTableComponent } from "@po-ui/ng-components";
import { finalize } from "rxjs";

@Component({
  selector: 'app-user-list-page',
  templateUrl: './user-list-page.component.html'
})
export class InputOutputListPageComponent implements OnInit {

  @ViewChild(PoTableComponent, { static: true }) poTable!: PoTableComponent;

  loading = true;

  public readonly breadcrumbs: PoBreadcrumb = {
    items: [
      { label: 'Home', link: '/' },
      { label: 'User list' }
    ]
  };

  users: Array<User>= [];

  columns: Array<PoTableColumn> = [
    { label: 'Code', property: 'id' },
    { label: 'Name', property: 'name' },
  ];

  actions: Array<PoTableAction> = [
    { action: this.edit.bind(this), label: 'Edit' },
    { action: this.delete.bind(this), label: 'Delete' }
  ]

  edit(row: User) {
    console.log('row ->', row);
  }

  delete(row: User) {
    console.log('userEditDeleteService ->', this.userEditDeleteService);
    this.poTable.removeItem(row);
  }


  constructor(
    private readonly userListServiceService: UserListServiceService,
    private readonly userEditDeleteService: UserEditDeleteService,
  ) { }

  ngOnInit() {
    this.userListServiceService.getAll()
      .pipe(
        finalize(() => this.loading = false)
      )
      .subscribe(users => {
        this.users = users.items;
      });
  }
}