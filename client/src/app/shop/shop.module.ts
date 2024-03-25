import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ShopRoutingModule } from './shop-routing.module';
import { ShopComponent } from './shop.component';
import { HomeComponent } from './home/home.component';
import { CoreModule } from '../core/core.module';
import { ProductComponent } from './product/product.component';
import { CartComponent } from './cart/cart.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthModule } from './auth/auth.module';



@NgModule({
  declarations: [
    ShopComponent,
    HomeComponent,
    ProductComponent,
    CartComponent,
  ],
  imports: [
    CommonModule,
    ShopRoutingModule,
    RouterModule,
    CoreModule,
    AuthModule
  ],
  exports: [
    ShopComponent
  ]
})
export class ShopModule { }
