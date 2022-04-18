import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {AuctionManagementComponent} from './auction-management/auction-management.component';
import {AuctionManagementDetailComponent} from './auction-management-detail/auction-management-detail.component';
import {ProductListComponent} from './product-list/product-list.component';
import {ProductEditComponent} from './product-edit/product-edit.component';
import {ProductApprovalComponent} from './product-approval/product-approval.component';
import {InstructionComponent} from './instruction/instruction.component';

const routes: Routes = [
  {
    path: 'list', component: AuctionManagementComponent
  },
  {
    path: 'detail', component: AuctionManagementDetailComponent
  },
  {
    path: 'instruction', component: InstructionComponent
  },
  {
    path: 'product', component: ProductListComponent
  },
  {
    path: 'product/edit', component: ProductEditComponent
  },
  {
    path: 'product/approval', component: ProductApprovalComponent
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
export class AuctionManagementRoutingModule { }
