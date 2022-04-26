import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ProductTaiLM} from "../model/product-tai-lm";
import {Observable} from "rxjs";

const API_URL ="http://localhost:8080/product/"
@Injectable({
  providedIn: 'root'
})
export class RegisterProductTaiLMService {

  constructor(private httpClient: HttpClient) { }

  public registerProduct(product: ProductTaiLM): Observable<void>{
    return this.httpClient.post<void>(API_URL + 'register' , product)
  }
}
