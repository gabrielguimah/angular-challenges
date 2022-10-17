import { UsersGroupEditDeleteService } from '@api/users_group/users-group-delete-service.service';
import { UsersGroup, UsersGroupListServiceService } from '@api/users_group/users-group-list-service.service';
import { Component, OnInit, ViewChild } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { PoBreadcrumb, PoPageAction, PoTableAction, PoTableColumn, PoTableComponent } from "@po-ui/ng-components";
import { finalize } from "rxjs";

@Component({
  selector: 'app-users-group-list-page',
  templateUrl: './users-group-list-page.component.html'
})
export class UsersGroupListPageComponent implements OnInit {

  @ViewChild(PoTableComponent, { static: true }) poTable!: PoTableComponent;

  loading = true;

  pageBreadcrumbs: PoBreadcrumb = {
    items: [
      { label: 'Home', link: '/' },
      { label: 'Users Group list' }
    ]
  };

  pageActions: Array<PoPageAction> = [
    { label: 'New Users Group', url: 'users_groups/new' }
  ]

  usersGroups: Array<UsersGroup>= [];

  tableColumns: Array<PoTableColumn> = [
    { label: 'Code', property: 'id' },
    { label: 'Name', property: 'name' },
  ];

  tableActions: Array<PoTableAction> = [
    { action: this.edit.bind(this), label: 'Edit' },
    { action: this.delete.bind(this), label: 'Delete' }
  ]

  private edit(row: UsersGroup) {
    this.router.navigate([`edit/${row.id}`], { relativeTo: this.activatedRoute });
  }

  private delete(row: UsersGroup) {
    this.loading = true;

    this.usersGroupEditDeleteService.delete(row.id)
      .pipe(finalize(() => this.loading = false))
      .subscribe(() => this.poTable.removeItem(row));
  }


  constructor(
    private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute,
    private readonly usersGroupListServiceService: UsersGroupListServiceService,
    private readonly usersGroupEditDeleteService: UsersGroupEditDeleteService,
  ) { }

  ngOnInit() {
    this.usersGroupListServiceService.getAll()
      .pipe(finalize(() => this.loading = false))
      .subscribe(usersGroups => {
        this.usersGroups = usersGroups.items;
      });
  }
}
