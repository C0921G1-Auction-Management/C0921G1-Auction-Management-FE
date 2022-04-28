import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ChatRoutingModule} from "./chat-routing.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { MessgaeBoxComponent } from './messgae-box/messgae-box.component';


@NgModule({
  declarations: [MessgaeBoxComponent],
  exports: [
    MessgaeBoxComponent
  ],
  imports: [
    CommonModule,
    ChatRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class ChatModule {
}
