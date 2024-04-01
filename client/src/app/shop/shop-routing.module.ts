import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShopComponent } from './shop.component';
import { HomeComponent } from './home/home.component';
import { ProductComponent } from './product/product.component';
import { CartComponent } from './cart/cart.component';
import { RegisterComponent } from './auth/register/register.component';
import { LoginComponent } from './auth/login/login.component';
import { AuthActivate } from '../guards/auth.activate';
import { GuestActivate } from '../guards/guest.activate';

const routes: Routes = [
  { path: "shop", component: ShopComponent, children: [
    { path: "", pathMatch: "full", component: HomeComponent },
    { path: "cart", component: CartComponent, canActivate: [AuthActivate] },
    { path: ":id", component: ProductComponent }
  ] },
  { path: "auth", component: ShopComponent, children: [
    { path: "register", component: RegisterComponent, canActivate: [GuestActivate] },
    { path: "login", component: LoginComponent, canActivate: [GuestActivate] }
  ] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class ShopRoutingModule { }
