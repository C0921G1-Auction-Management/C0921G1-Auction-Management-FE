import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListMemberManagementComponent } from './list-member-management/list-member-management.component';
import { LockMemberManagementComponent } from './lock-member-management/lock-member-management.component';
import {UserManagementRoutingModule} from './user-management-routing.module';



@NgModule({
  declarations: [ListMemberManagementComponent, LockMemberManagementComponent],
  imports: [
    CommonModule,
    UserManagementRoutingModule
  ]
})
export class UserManagementModule { }
