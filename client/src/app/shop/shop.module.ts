import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ShopRoutingModule } from './shop-routing.module';
import { ShopComponent } from './shop.component';
import { HomeComponent } from './home/home.component';
import { CoreModule } from '../core/core.module';



@NgModule({
  declarations: [
    ShopComponent,
    HomeComponent,
  ],
  imports: [
    CommonModule,
    ShopRoutingModule,
    RouterModule,
    CoreModule,

  ],
  exports: [
    ShopComponent
  ]
})
export class ShopModule { }
