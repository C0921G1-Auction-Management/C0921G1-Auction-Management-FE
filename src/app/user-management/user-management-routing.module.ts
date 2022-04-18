import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {ListMemberManagementComponent} from './list-member-management/list-member-management.component';
import {LockMemberManagementComponent} from './lock-member-management/lock-member-management.component';

const routes: Routes = [
  {
    path: '', component: ListMemberManagementComponent
  },
  {
    path: 'lock', component: LockMemberManagementComponent
  }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class UserManagementRoutingModule { }
