import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './layout/home/home.component';

const routes: Routes = [
  {
    path: '', redirectTo: 'home', pathMatch: 'full'
  },
  {
    path: 'home', component: HomeComponent
  },
  {
    path: 'home/:status', component: HomeComponent
  },
  {
    path: 'member', loadChildren: () => import('./user-management/user-management.module').then(module => module.UserManagementModule)
  },
  {
    path: 'login', loadChildren: () => import('./login/login.module').then(module => module.LoginModule)
  },
  {
    path: 'user', loadChildren: () => import('./user-client/user-client.module').then(module => module.UserClientModule)
  },
  {
    path: 'auction-management', loadChildren: () => import('./auction-management/auction-management.module').then(module => module.AuctionManagementModule)
  },
  {
    path: 'auction-client', loadChildren: () => import('./auction-client/auction-client.module').then(module => module.AuctionClientModule)
  }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
