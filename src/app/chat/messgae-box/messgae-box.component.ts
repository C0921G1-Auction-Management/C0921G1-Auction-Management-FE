import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators} from "@angular/forms";
import {DatePipe} from "@angular/common";
import {TokenStorageService} from "../../service/security/token-storage.service";
import firebase from "firebase";
import {ErrorStateMatcher} from "@angular/material/core";
import {ChatroomService} from "../../service/chat/chatroom.service";
import {ShareService} from "../../service/security/share.service";


export const snapshotToArray = (snapshot: any) => {
  const returnArr = [];

  snapshot.forEach((childSnapshot: any) => {
    const item = childSnapshot.val();
    item.key = childSnapshot.key;
    returnArr.push(item);
  });

  return returnArr;
};

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-messgae-box',
  templateUrl: './messgae-box.component.html',
  styleUrls: ['./messgae-box.component.css']
})
export class MessgaeBoxComponent implements OnInit {
  @ViewChild('chatcontent') chatcontent: ElementRef;
  scrolltop: number = null;

  chatForm: FormGroup;
  nickname = '';
  roomname = '';
  message = '';
  chats = [];
  matcher = new MyErrorStateMatcher();

  roles: string[] = [];
  username: string;

  isDisplay = false;

  constructor(private formBuilder: FormBuilder,
              public datePipe: DatePipe,
              private tokenStorageService: TokenStorageService,
              private chatroomService: ChatroomService,
              private shareService: ShareService) {
    this.shareService.getClickEvent().subscribe(() => {
      this.ngOnInit();
      this.roomname = "admin";
      this.hiddenChat();
    });

    this.shareService.getClickEvent1().subscribe(() => {
      this.ngOnInit();
      this.displayChat();
    });

  }

  ngOnInit(): void {
    this.scrolltop = null;
    if (this.tokenStorageService.getUser()) {
      this.roles = this.tokenStorageService.getUser().roles;
      this.username = this.tokenStorageService.getUser().username;
      if (this.roles[0] === 'ROLE_ADMIN') {
        this.nickname = 'admin';
        this.chatroomService.roomnameSend.subscribe(value => {
          this.roomname = value;
          console.log(this.roomname);
        })
      } else {
        this.nickname = this.tokenStorageService.getUser().username;
        this.roomname = this.nickname;
      }
    } else {
      if (sessionStorage.getItem('room') == null) {
        this.roomname = Math.random().toString(36).substr(2, 7);
        const newRoom = {roomname: this.roomname};

        window.sessionStorage.removeItem('room');
        window.sessionStorage.setItem('room', this.roomname);

        firebase.database().ref('rooms/').push().set(newRoom);
      } else {
        this.roomname = sessionStorage.getItem('room');
      }
      this.nickname = 'Visitor';
    }
    firebase.database().ref('chats/').orderByChild('roomname').equalTo(this.roomname).on('value', resp => {
      this.chats = [];
      this.chats = snapshotToArray(resp);
      if (this.chats.length == 0){
        const newRoom = {roomname: this.roomname};
        firebase.database().ref('rooms/').push().set(newRoom);
      }
      setTimeout(() => this.scrolltop = this.chatcontent.nativeElement.scrollHeight, 500);
    });


    this.chatForm = this.formBuilder.group({
      message: ['', Validators.required]
    });

  }

  onSubmit() {
    const chat = this.chatForm.value;
    console.log(chat)
    chat.roomname = this.roomname;
    chat.nickname = this.nickname;
    chat.date = this.datePipe.transform(new Date(), 'dd/MM/yyyy HH:mm:ss');
    chat.type = 'message';
    const newMessage = firebase.database().ref('chats/').push();
    newMessage.set(chat);
    this.chatForm = this.formBuilder.group({
      message: ['', Validators.required]
    });
  }

  displayChat() {
    this.isDisplay = true;
    this.ngOnInit();
  }

  hiddenChat() {
    this.isDisplay = false;
  }

}
