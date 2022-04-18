import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuctionClientStatusComponent } from './auction-client-status/auction-client-status.component';
import { AuctionClientReceiptComponent } from './auction-client-receipt/auction-client-receipt.component';
import {AuctionClientRoutingModule} from './auction-client-routing.module';



@NgModule({
  declarations: [AuctionClientStatusComponent, AuctionClientReceiptComponent],
  imports: [
    CommonModule,
    AuctionClientRoutingModule
  ]
})
export class AuctionClientModule { }
