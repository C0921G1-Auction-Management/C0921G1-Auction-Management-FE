import { NgModule } from '@angular/core';
import {CommonModule} from '@angular/common';
import { AuctionClientStatusComponent } from './auction-client-status/auction-client-status.component';
import { AuctionClientReceiptComponent } from './auction-client-receipt/auction-client-receipt.component';
import {AuctionClientRoutingModule} from './auction-client-routing.module';
import {AuctionRegisterProductComponent} from "./auction-register-product/auction-register-product.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";



@NgModule({
  declarations: [AuctionClientStatusComponent, AuctionClientReceiptComponent, AuctionRegisterProductComponent],
  imports: [
    CommonModule,
    AuctionClientRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class AuctionClientModule { }
