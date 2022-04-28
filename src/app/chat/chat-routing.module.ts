import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {RoomlistComponent} from "./roomlist/roomlist.component";




const routes: Routes = [
  {
    path: 'roomlist', component: RoomlistComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChatRoutingModule {
}
