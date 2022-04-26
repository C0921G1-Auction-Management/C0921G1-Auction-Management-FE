import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AuctionClientStatusComponent} from './auction-client-status/auction-client-status.component';
import {AuctionClientReceiptComponent} from './auction-client-receipt/auction-client-receipt.component';
import {AuctionClientRoutingModule} from './auction-client-routing.module';
import {AuctionClientPerformComponent} from './auction-client-perform/auction-client-perform.component';
import { DialogComponentComponent } from './dialog-component/dialog-component.component';


@NgModule({
  declarations: [AuctionClientStatusComponent,
                 AuctionClientReceiptComponent,
                 AuctionClientPerformComponent,
                 DialogComponentComponent],
  imports: [
    CommonModule,
    AuctionClientRoutingModule
  ]
})
export class AuctionClientModule {
}
