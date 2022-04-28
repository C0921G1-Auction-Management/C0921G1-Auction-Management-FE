import { Injectable } from '@angular/core';
import {Observable, Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShareService {

  constructor() { }

  private subject = new Subject<any>();
  private subject1 = new Subject<any>();

  sendClickEvent() {
    this.subject.next();
  }
  getClickEvent(): Observable<any>{
    return this.subject.asObservable();
  }

  sendClickEvent1() {
    this.subject1.next();
  }
  getClickEvent1(): Observable<any>{
    return this.subject1.asObservable();
  }
}
