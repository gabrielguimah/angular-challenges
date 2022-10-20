import { CommonModule } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Router, Routes } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

import { PoMenuComponent, PoMenuModule, PoPageModule, PoToolbarModule } from '@po-ui/ng-components';

import { AppComponent } from './app.component';

export const routes: Routes = [
  { path: 'inputOutput', loadChildren: () => import('./pages/input-ouput-page/input-ouput-page.module').then(m => m.InputOuputPageModule) },
  { path: 'users', loadChildren: () => import('./pages/user/user.module').then(m => m.UserModule) }
];

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let router: Router;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        CommonModule,
        RouterTestingModule.withRoutes(routes),
        HttpClientTestingModule,
        PoMenuModule,
        PoPageModule,
        PoToolbarModule,
      ],
      declarations: [
        PoMenuComponent,
        AppComponent
      ],
    }).compileComponents();

    router = TestBed.inject(Router);

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.debugElement.componentInstance;

    fixture.detectChanges();
  }));

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('Should navigate to inputOutput', () => {
    // Given
    spyOn(router, 'navigate');

    for (let i = 0, len = component.menus.length; i < len; i++) {
      // When
      component.menus[i].action?.apply(this);
    };

    // Then
    expect(router.navigate).toHaveBeenCalledTimes(component.menus.length);
  });
});
