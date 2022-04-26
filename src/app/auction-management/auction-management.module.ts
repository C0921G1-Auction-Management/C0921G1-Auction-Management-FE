import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuctionManagementComponent } from './auction-management/auction-management.component';
import { AuctionManagementDetailComponent } from './auction-management-detail/auction-management-detail.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductApprovalComponent } from './product-approval/product-approval.component';
import { ProductEditComponent } from './product-edit/product-edit.component';
import {AuctionManagementRoutingModule} from './auction-management-routing.module';
import {InstructionComponent} from "./instruction/instruction.component";



@NgModule({
  declarations: [AuctionManagementComponent, AuctionManagementDetailComponent, ProductListComponent, ProductApprovalComponent, ProductEditComponent,
  InstructionComponent],
  imports: [
    CommonModule,
    AuctionManagementRoutingModule
  ]
})
export class AuctionManagementModule { }
