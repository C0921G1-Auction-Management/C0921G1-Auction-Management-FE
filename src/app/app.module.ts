import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HeaderComponent } from './layout/header/header.component';
import { HomeComponent } from './layout/home/home.component';
import { FooterComponent } from './layout/footer/footer.component';
import {AppRoutingModule} from './app-routing.module';
import {HttpClientModule} from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {AuctionClientModule} from "./auction-client/auction-client.module";
import {CommonModule, CurrencyPipe} from "@angular/common";
import {AngularFireModule, FirebaseApp} from "@angular/fire";
import { environment } from 'src/environments/environment';
import {AngularFireStorage} from "@angular/fire/storage";

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    AuctionClientModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig)
  ],
  providers: [CurrencyPipe,AngularFireStorage],
  bootstrap: [AppComponent]
})
export class AppModule { }
