import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {MemberKhanhLDQ} from "../model/member-khanh-ldq";
import {Observable} from "rxjs";

const connect_backend_url = 'http://localhost:8080/c09';

@Injectable({
  providedIn: 'root'
})
export class MemberRegistrationService {

  constructor(
    private http: HttpClient
  ) {
  }

  //register new member - KhanhLDQ
  createMember(member: MemberKhanhLDQ): Observable<any> {
    return this.http.post<any>(connect_backend_url + '/public/member', member);
  }

  //

}
