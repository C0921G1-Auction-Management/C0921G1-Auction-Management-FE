import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Product} from '../model/Product';
import {Auction} from '../model/Auction';

@Injectable({
  providedIn: 'root'
})
export class AuctionServiceService {
  API_URL_LIST = 'http://localhost:8080/c09/user/auction';
  httpOptions: any;

  constructor(private httpClient: HttpClient) {}

  public findById(id: number): Observable<Product> {
    return this.httpClient.get<Product>(this.API_URL_LIST + '/product/' + id);
  }

  public getListPrice(productId: number,price: number): Observable<any> {
    return this.httpClient.get<any>(this.API_URL_LIST + '/list-current-price/?productId='+ productId+ '&price=' + price);
  }

  public getListAuctionMember(seeMore: number, page: number, productId: number): Observable<Auction[]> {
    return this.httpClient.get<Auction[]>(this.API_URL_LIST + '/get-info-auction/?page='+ page+ '&seeMore=' + seeMore + '&productId='+ productId);
  }

  public getInfoWinner(): Observable<Auction> {
    return this.httpClient.get<Auction>(this.API_URL_LIST + '/get-info-winner');
  }

  public getInfoWinnerTemp(): Observable<Auction> {
    return this.httpClient.get<Auction>(this.API_URL_LIST + '/get-info-winner-temp');
  }
}
