import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { PoButtonModule, PoContainerModule, PoFieldModule, PoPageModule } from '@po-ui/ng-components';

import { InputOutputListPageComponent } from './list/input-output-list-page.component';
import { ChildOneComponent } from './list/components/child-one/child-one.component';
import { ChildTwoComponent } from './list/components/child-two/child-two.component';
import { ChildThreeComponent } from './list/components/child-three/child-three.component';
import { ChildFourComponent } from './list/components/child-four/child-four.component';
import { ChildFiveComponent } from './list/components/child-five/child-five.component';

const routes: Routes = [
  { path: '', component: InputOutputListPageComponent }
]

@NgModule({
  declarations: [
    InputOutputListPageComponent,
    ChildOneComponent,
    ChildTwoComponent,
    ChildThreeComponent,
    ChildFourComponent,
    ChildFiveComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    PoPageModule,
    PoContainerModule,
    PoFieldModule,
    PoButtonModule
  ]
})
export class InputOuputPageModule { }
