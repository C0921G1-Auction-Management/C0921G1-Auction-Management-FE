import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {AuctionRegisterProductComponent} from './auction-register-product/auction-register-product.component';
import {InstructionComponent} from '../auction-management/instruction/instruction.component';
import {AuctionClientDetailComponent} from './auction-client-detail/auction-client-detail.component';
import {AuctionClientPerformComponent} from './auction-client-perform/auction-client-perform.component';
import {AuctionClientPaypalComponent} from './auction-client-paypal/auction-client-paypal.component';
import {AuctionClientAuctionedComponent} from './auction-client-auctioned/auction-client-auctioned.component';
import {AuctionClientStatusComponent} from './auction-client-status/auction-client-status.component';
import {AuctionClientReceiptComponent} from './auction-client-receipt/auction-client-receipt.component';

const routes: Routes = [
  {
    path: 'register', component: AuctionRegisterProductComponent
  },
  {
    path: 'instructor', component: InstructionComponent
  },
  {
    path: 'detail', component: AuctionClientDetailComponent
  },
  {
    path: 'perform', component: AuctionClientPerformComponent
  },
  {
    path: 'paypal', component: AuctionClientPaypalComponent
  },
  {
    path: 'auctioned', component: AuctionClientAuctionedComponent
  },
  {
    path: 'status', component: AuctionClientStatusComponent
  },
  {
    path: 'receipt', component: AuctionClientReceiptComponent
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
export class AuctionClientRoutingModule { }
