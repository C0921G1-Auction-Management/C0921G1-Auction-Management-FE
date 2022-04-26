import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Auction} from '../../model/Auction';

@Component({
  selector: 'app-dialog-component',
  templateUrl: './dialog-component.component.html',
  styleUrls: ['./dialog-component.component.css']
})
export class DialogComponentComponent implements OnInit {
  flag1: boolean = true;

  constructor(
    public dialogRef: MatDialogRef<DialogComponentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {auction: Auction, flag: boolean},
  ) { }

  ngOnInit(): void {
    this.flag1 = this.data.flag;
    setTimeout(()=>{
      this.dialogRef.close();
    }, 3500);
  }


}
