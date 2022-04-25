import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {AuctionRegisterProductComponent} from './auction-client/auction-register-product/auction-register-product.component';
import {InstructionComponent} from './auction-management/instruction/instruction.component';
import {AuctionClientDetailComponent} from './auction-client/auction-client-detail/auction-client-detail.component';
import {AuctionClientPerformComponent} from './auction-client/auction-client-perform/auction-client-perform.component';
import {AuctionClientPaypalComponent} from './auction-client/auction-client-paypal/auction-client-paypal.component';
import {AuctionClientAuctionedComponent} from './auction-client/auction-client-auctioned/auction-client-auctioned.component';
import {HeaderComponent} from './layout/header/header.component';
import {HomeComponent} from './layout/home/home.component';
import {FooterComponent} from './layout/footer/footer.component';
import {AppRoutingModule} from './app-routing.module';
import {NgxPaginationModule} from "ngx-pagination";
import {HttpClientModule} from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";



@NgModule({
  declarations: [
    AuctionClientPaypalComponent,
    AuctionClientAuctionedComponent,
    AppComponent,
    HeaderComponent,
    HomeComponent,
    FooterComponent
  ],
  imports: [

    ReactiveFormsModule,
    HttpClientModule,
    NgxPaginationModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
