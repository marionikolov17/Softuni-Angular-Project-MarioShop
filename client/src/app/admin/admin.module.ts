import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AdminRoutingModule } from './admin-routing.module';
import { CoreModule } from '../core/core.module';
import { AdminPageComponent } from './admin-page/admin-page.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [
    AdminLoginComponent,
    AdminPageComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    ReactiveFormsModule,
    CoreModule,
    FontAwesomeModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule,
    SharedModule
  ]
})
export class AdminModule { }
