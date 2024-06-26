import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { AdminPageComponent } from './admin-page/admin-page.component';
import { AdminAuthActivate } from '../guards/admin-auth.activate';

const routes: Routes = [
  { path: "admin", children: [
    { path: "", pathMatch: "full", component: AdminPageComponent, canActivate: [AdminAuthActivate] },
    { path: "login", component: AdminLoginComponent }
  ] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
