import { NgModule } from '@angular/core';
import { RouterModule, Routes, PreloadAllModules, ExtraOptions } from '@angular/router';

import { FullLayoutComponent } from "./layouts/full/full-layout.component";
import { ContentLayoutComponent } from "./layouts/content/content-layout.component";

import { Full_ROUTES } from "./shared/routes/full-layout.routes";
import { CONTENT_ROUTES } from "./shared/routes/content-layout.routes";

import { AuthGuard } from './shared/auth/auth-guard.service';

const routerOptions: ExtraOptions = {
  useHash: false,
  anchorScrolling: 'enabled',
  scrollPositionRestoration: 'enabled',
  //enableTracing: true,
  // ...any other options you'd like to use
};

const appRoutes: Routes = [
  {
    path: '',
    redirectTo: 'user/login',
    pathMatch: 'full',
  },
  { path: '', component: FullLayoutComponent, data: { title: 'full Views' }, children: Full_ROUTES, canActivate: [ AuthGuard ] },
  { path: '', component: ContentLayoutComponent, data: { title: 'content Views' }, children: CONTENT_ROUTES },
  {
    path: '**',
    redirectTo: 'error'
  }
];

@NgModule( {
  imports: [ RouterModule.forRoot( appRoutes, routerOptions ) ],
  exports: [ RouterModule ]
} )

export class AppRoutingModule {

}