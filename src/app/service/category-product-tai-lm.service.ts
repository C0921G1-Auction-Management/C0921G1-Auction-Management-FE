import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {CategoryProductTaiLM} from "../model/category-product-tai-lm";

const API_URL ="http://localhost:8080/category/"
@Injectable({
  providedIn: 'root'
})
export class CategoryProductTaiLMService {

  constructor(private httpClient: HttpClient) { }

  public findAll(): Observable<CategoryProductTaiLM[]>{
    return this.httpClient.get<CategoryProductTaiLM[]>(API_URL);
  }
}
