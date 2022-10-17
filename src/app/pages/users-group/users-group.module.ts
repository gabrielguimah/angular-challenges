import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { PoContainerModule, PoFieldModule, PoPageModule, PoTableModule } from '@po-ui/ng-components';

import { UsersGroupListPageComponent } from './list/users-group-list-page.component';
import { UsersGroupEditPageComponent } from './edit/users-group-edit-page.component';
import { UsersGroupNewPageComponent } from './new/users-group-new-page.component';

const routes: Routes = [
  { path: '', component: UsersGroupListPageComponent },
  { path: 'new', component: UsersGroupNewPageComponent },
  { path: 'edit/:id', component: UsersGroupEditPageComponent }
];

@NgModule({
  declarations: [
    UsersGroupListPageComponent,
    UsersGroupEditPageComponent,
    UsersGroupNewPageComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    FormsModule,
    PoPageModule,
    PoTableModule,
    PoContainerModule,
    PoFieldModule
  ]
})
export class UsersGroupModule { }
