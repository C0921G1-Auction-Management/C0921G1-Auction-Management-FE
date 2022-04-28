import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatisticalAuctionComponent } from './statistical-auction/statistical-auction.component';
import {StatisticalRoutingModule} from './statistical-routing.module';



@NgModule({
  declarations: [StatisticalAuctionComponent],
  imports: [
    CommonModule,
    StatisticalRoutingModule
  ]
})
export class StatisticalModule { }
