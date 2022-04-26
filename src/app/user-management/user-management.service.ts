import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {UserModelNhanNT} from "./user-model-nhan-nt";

@Injectable({
  providedIn: 'root'
})
export class UserManagementService {

  private API_URL_NHANNT = 'http://localhost:8080/c09'
  httpOptions: any;

  constructor(private http: HttpClient,
              ) { }


  //NhanNT get list
  getListMember(page:number, id:string, name:string , address:string, email:string, memberRank:number): Observable<any> {
    return this.http.get<UserModelNhanNT[]>(this.API_URL_NHANNT + '/member/list?' + 'page='+page+'&memberID='+id+'&memberName='+name +'&memberAddress=' +address+'&memberEmail='+email+'&memberRank='+memberRank);
  }

  //NhanNT lock member list
  lockMemberList(listMember:string): Observable<void>{
    return this.http.get<void>(this.API_URL_NHANNT+'/member/lock?listMember='+listMember)
  }

}
