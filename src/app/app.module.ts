import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { PoMenuModule, PoToolbarModule } from '@po-ui/ng-components';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot([]),
    PoToolbarModule,
    PoMenuModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
