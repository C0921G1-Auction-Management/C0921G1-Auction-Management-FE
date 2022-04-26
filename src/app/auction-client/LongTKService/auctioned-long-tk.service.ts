import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, Observable} from "rxjs";
import {ProductDTOLongTK} from "../../model/LongTK/ProductDTOLongTK";

@Injectable({
  providedIn: 'root'
})
export class AuctionedLongTKService {

  private AUCTIONED_API = 'http://localhost:8080/payment';

  private RATE_API = 'https://free.currconv.com/api/v7/convert?q=USD_VND&compact=ultra&apiKey=7d77ed9e781fd690903a';
  httpOptions: any;

  constructor(private http: HttpClient) {

  }
  sendMail(to: string, totalPrice: string, quantity: number, deliveryNote: string): Observable<any> {
    console.log('mail link is : ')
    console.log(this.AUCTIONED_API  + '/sendmail/' + '?to='+ to +'&totalPrice=' + totalPrice+'&quantity=' +quantity + '&deliveryNote=' + deliveryNote)
    return this.http.get<ProductDTOLongTK[]>(
      this.AUCTIONED_API  + '/sendmail/' + '?to='+ to +'&totalPrice=' + totalPrice +'&quantity=' +quantity + '&deliveryNote=' + deliveryNote);
  }

  getAuctionedProduct(id: number, pageNo: number): Observable<any> {
    return this.http.get<ProductDTOLongTK[]>(
      this.AUCTIONED_API + '/productList/' + id + '?pageNo=' + pageNo);
  }

  getListProduct(id: number): Observable<any> {
    return this.http.get<ProductDTOLongTK[]>(
      this.AUCTIONED_API + '/findAllProduct/' + id);
  }

  getPrice(id: number): Observable<any> {
    return this.http.get<number>(
      this.AUCTIONED_API + '/getPrice/' + id);
  }

  findMemberById(id: number): Observable<any> {
    return this.http.get<number>(
      this.AUCTIONED_API + '/findMemer/' + id);
  }

  oneUsdToVndRate(): Observable<any>{
    return this.http.get<string>(
      this.RATE_API);
  }


  // getHttpOption() {
  //   this.httpOptions = {
  //     headers: new HttpHeaders({
  //       'Content-Type': 'application/json',
  //       'Authorization': `Bearer ` + JSON.parse(this.tokenStorage.getToken()).token
  //     })
  //     , 'Access-Control-Allow-Origin': 'http://localhost:4200',
  //     'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS'
  //   };
  //   return this.httpOptions;
  // }
//


}
