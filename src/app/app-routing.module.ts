import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'inputOutput', loadChildren: () => import('./pages/input-ouput-page/input-ouput-page.module').then(m => m.InputOuputPageModule) },
  { path: 'users', loadChildren: () => import('./pages/user/user.module').then(m => m.UserModule) },
  { path: '', redirectTo: '/inputOutput', pathMatch: 'full' },
  { path: '**', redirectTo: '/inputOutput' }
];
 @NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
