import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { PoButtonModule, PoContainerModule, PoFieldModule, PoPageModule } from '@po-ui/ng-components';

import { InputOutputPageComponent } from './input-output-page.component';
import { ChildOneComponent } from './components/child-one/child-one.component';
import { ChildTwoComponent } from './components/child-two/child-two.component';
import { ChildThreeComponent } from './components/child-three/child-three.component';
import { ChildFourComponent } from './components/child-four/child-four.component';
import { ChildFiveComponent } from './components/child-five/child-five.component';

const routes: Routes = [
  { path: '', component: InputOutputPageComponent }
]

@NgModule({
  declarations: [
    InputOutputPageComponent,
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
