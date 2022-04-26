import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {UserManagementService} from "../user-management.service";
import Swal from 'sweetalert2';
import {FormGroup} from "@angular/forms";

@Component({
  selector: 'app-lock-member-management',
  templateUrl: './lock-member-management.component.html',
  styleUrls: ['./lock-member-management.component.css']
})
export class LockMemberManagementComponent implements OnInit {

  ids: string = "";
  member: string = "";

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              public dialogRef: MatDialogRef<LockMemberManagementComponent>,
              private userManagementService: UserManagementService) {
  }

  ngOnInit(): void {
    for (let i = 0; i < this.data.length; i++) {
      if (i === this.data.length - 1) {
        this.ids += this.data[i].id
      } else {
        this.ids += this.data[i].id + ","
      }
    }
    for (let i = 0; i < this.data.length; i++) {
      if (i === this.data.length - 1) {
        this.member += this.data[i].name +"("+this.data[i].id+")"
      } else {
        this.member += this.member += this.data[i].name +"("+this.data[i].id+")" + ","
      }
    }
    console.log(this.member)
  }


  public onSubmit(ids: string) {
    this.userManagementService.lockMemberList(ids).subscribe(value => {
      this.cancel();
      Swal.fire({
        position: 'top',
        background: '#f8f9fa',
        width: 400,
        heightAuto: true,
        icon: 'success',
        title: 'Bạn khoá thành công các ID: ' + ids,
        toast: true,
        showConfirmButton: false,
        timer: 3000,
      })
    }, error => {
    });
  }

  public cancel() {
    this.dialogRef.close();
  }
}
