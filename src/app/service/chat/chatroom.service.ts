import {Injectable} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {BehaviorSubject} from "rxjs";
import {ShareService} from "../security/share.service";

@Injectable({
  providedIn: 'root'
})
export class ChatroomService {
  private roomname = new BehaviorSubject('');
  roomnameSend = this.roomname.asObservable();


  constructor(private route: ActivatedRoute, private router: Router,
              private shareService: ShareService) {
  }

  sendRoomName(room: string) {
    this.roomname.next(room)
    this.shareService.sendClickEvent1();
  }

  public openChat(room: string) {
    this.sendRoomName(room);
  }

}
