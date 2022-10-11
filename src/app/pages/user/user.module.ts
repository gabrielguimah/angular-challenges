import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { PoPageModule, PoTableModule } from '@po-ui/ng-components';


import { InputOutputListPageComponent } from './list/user-list-page.component';
import { UserReadPageComponent } from './read/user-read-page.component';
import { UserEditPageComponent } from './edit/user-edit-page.component';

const routes: Routes = [
  { path: '', component: InputOutputListPageComponent },
  { path: ':id', component: UserReadPageComponent }
];

@NgModule({
  declarations: [
    InputOutputListPageComponent,
    UserReadPageComponent,
    UserEditPageComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    FormsModule,
    PoPageModule,
    PoTableModule
  ]
})
export class UserModule { }
