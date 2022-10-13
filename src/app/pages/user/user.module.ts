import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { PoContainerModule, PoFieldModule, PoPageModule, PoTableModule } from '@po-ui/ng-components';

import { UserListPageComponent } from './list/user-list-page.component';
import { UserEditPageComponent } from './edit/user-edit-page.component';
import { UserNewPageComponent } from './new/user-new-page.component';

const routes: Routes = [
  { path: '', component: UserListPageComponent },
  { path: 'new', component: UserNewPageComponent },
  { path: 'edit/:id', component: UserEditPageComponent }
];

@NgModule({
  declarations: [
    UserListPageComponent,
    UserEditPageComponent,
    UserNewPageComponent
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
export class UserModule { }
