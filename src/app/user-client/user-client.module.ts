import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterComponent } from './register/register.component';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { UserEditComponent } from './user-edit/user-edit.component';
import {UserClientRoutingModule} from './user-client-routing.module';



@NgModule({
  declarations: [RegisterComponent, UserDetailComponent, UserEditComponent],
  imports: [
    CommonModule,
    UserClientRoutingModule
  ]
})
export class UserClientModule { }
