import { Component, OnInit } from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {UserManagementService} from "../user-management.service";
import {Observable} from "rxjs";
import {UserModelNhanNT} from "../user-model-nhan-nt";
import {LockMemberManagementComponent} from "../lock-member-management/lock-member-management.component";

@Component({
  selector: 'app-list-member-management',
  templateUrl: './list-member-management.component.html',
  styleUrls: ['./list-member-management.component.css']
})
export class ListMemberManagementComponent implements OnInit {

  userModelList: UserModelNhanNT[];
  userModel: UserModelNhanNT;
  // observableSpin= new Observable(this.myObservable);
  page: number = 0;

  totalPagination: number;
  totalElement: number
  searchId: string = "";
  searchName: string = "";
  searchAddress: string = "";
  searchEmail: string = "";
  searchRank: number = 0;
  listSelect: UserModelNhanNT[]=[];
  // flagCheck:boolean = false;

  constructor(
              private dialog: MatDialog,
              private userManagementService:UserManagementService,
              ) { }

  ngOnInit(): void {
    this.getListMember(this.page,this.searchId,this.searchName,this.searchAddress,this.searchEmail,this.searchRank);

  }


//NhanNT get member list
  getListMember(page:number, id:string, name:string , address:string, email:string, memberRank:number){
    this.userManagementService.getListMember(page,id,name,address,email,memberRank).subscribe(value => {
      // console.log(value)
      if(value === null){
        this.userModelList = [];
        this.totalPagination = 0;
        this.totalElement = 0;
      }
      else{
        this.userModelList = value['content'];
        this.totalPagination = value['totalPages'];
        this.totalElement = value['totalElements'];
      }
      // this.p = 0;
    })
  }
  nextPage() {
    if (this.page <= this.totalPagination) {
      this.page = this.page + 1;
    }
    this.getListMember(this.page,this.searchId,this.searchName,this.searchAddress,this.searchEmail,this.searchRank)
  }

  previousPage() {
    this.page = this.page - 1;
    if (this.page == 0 || this.page < 0) {
      this.page = 0;
      this.ngOnInit();
    } else {
      this.getListMember(this.page,this.searchId,this.searchName,this.searchAddress,this.searchEmail,this.searchRank)
    }
  }
  search(){
    this.page = 0;
    this.ngOnInit();
  }

  // select(user:UserModelNhanNT):any{
  //   console.log(this.flagCheck);
  //   console.log(user);
  // }

  // bat sự kiện checkbox
  selectMember(item) {
    // console.log(item)
    for (let i = 0; i < this.listSelect.length; i++) {
      if (this.listSelect[i].id == item.id) {
        this.listSelect.splice(i,1);
        // console.log(this.listSelect);
        return null;
      }
    }
    this.listSelect.push(item);
    // console.log(this.listSelect);
    // this.flagCheck = false;
  }
// sinh sát member
  public openDialog(listSelect: UserModelNhanNT[]): void{
    const dialogRef = this.dialog.open(LockMemberManagementComponent, {
      width: 'max-content',
      height: 'max-content',
      data: listSelect,
    });

    dialogRef.afterClosed().subscribe(result => {
      // this.name = '';
      // this.endDate = null;
      // this.startDate = null;
      this.page = 0;
      this.ngOnInit();
    });
  }
}

