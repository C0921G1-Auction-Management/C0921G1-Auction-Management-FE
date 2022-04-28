import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {StatisticalAuctionComponent} from './statistical-auction/statistical-auction.component';

const routes: Routes = [
  {
    path: 'pie', component: StatisticalAuctionComponent
  }
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class StatisticalRoutingModule { }
