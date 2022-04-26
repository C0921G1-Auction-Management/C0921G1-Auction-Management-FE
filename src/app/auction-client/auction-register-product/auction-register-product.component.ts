import {Component, Inject, OnInit} from '@angular/core';
import {CategoryProductTaiLM} from "../../model/category-product-tai-lm";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {RegisterProductTaiLMService} from "../../service/register-product-tai-lm.service";
import {CategoryProductTaiLMService} from "../../service/category-product-tai-lm.service";
import {CurrencyPipe, formatDate} from "@angular/common";
import {applySourceSpanToExpressionIfNeeded} from "@angular/compiler/src/output/output_ast";
import {AngularFireStorage} from "@angular/fire/storage";
import {element} from "protractor";
import DateTimeFormat = Intl.DateTimeFormat;
import {finalize} from "rxjs/operators";




@Component({
  selector: 'app-auction-register-product',
  templateUrl: './auction-register-product.component.html',
  styleUrls: ['./auction-register-product.component.css']
})
export class AuctionRegisterProductComponent implements OnInit {
  categoryList: CategoryProductTaiLM[];
  productForm: FormGroup;
  imgList:  string[]= [];
  imgFireBaseList: File[]= [];
  url: string;
  url1: string;
  url2: string;
  url3: string;
  url4: string;
  checkTypeFile = false;
  money: number;
  constructor(private productTaiLMService: RegisterProductTaiLMService,
              private categoryProductTaiLMService: CategoryProductTaiLMService,
              private currencyPipe: CurrencyPipe,
              private fb: FormBuilder,
              @Inject(AngularFireStorage) private storage: AngularFireStorage) { }

  ngOnInit(): void {
    this.getListCategory();
    this.productForm = this.fb.group({
      name: new FormControl('',[Validators.required]),
      startBid: new FormControl('',[Validators.required]),
      bidRange: new FormControl('',[Validators.required]),
      // finalBid: new FormControl(''),
      imageUrl: new FormControl('',[Validators.required]),
      startDate: new FormControl('',[Validators.required]),
      endDate: new FormControl('',[Validators.required]),
      description: new FormControl('',[Validators.required]),
      category: new FormControl('',[Validators.required]),
    })

    this.productForm.valueChanges.subscribe( form => {
      if (form.startBid){
        this.productForm.patchValue({
            startBid: this.currencyPipe.transform(form.startBid.replace(/\D/g, '').
            replace(/^0+/, ''), 'VND', 'symbol', '1.0-0')
        }, {emitEvent: false});
      }
    })
  }

  getListCategory(){
    this.categoryProductTaiLMService.findAll().subscribe(value => {
      this.categoryList = value;
    })
  }

  //đăng ký sản phẩm
  onSubmit(){
   this.productForm.get('startBid').setValue(this.formatStartBid(this.productForm.get('startBid').value));
    this.uploadImgFireBase();
    this.productTaiLMService.registerProduct(this.productForm.value).subscribe(value => {
    })
  }

  formatStartBid(startBid: string): any{
  this.productForm.get('startBid').setValue(startBid.split(/[\D,\s]/));
    const startBidList =this.productForm.get('startBid').value
    let format: string = startBidList[0];
    for(let i = 1; i < startBidList.length; i++) {
      format += startBidList[i];
    }
    return (format);
  }

  uploadImgFireBase(){
    for (let i = 0; i <this.imgFireBaseList.length ; i++) {
        const nameImg = this.getCurrentDateTime() + this.imgFireBaseList[i].name;
        const fileRef = this.storage.ref(nameImg);
        this.storage.upload(nameImg,this.imgFireBaseList[i]).snapshotChanges().pipe(
          finalize(() => {
              fileRef.getDownloadURL().subscribe((url) => {
                this.productForm.get("imgUrl").setValue(this.productForm.get("imgUrl").value.push(url));
                console.log(this.productForm.get("imgUrl").value)
              })
            }
          )
        )
    }

 }

  //check file
  checkFile(event: string): boolean {
    const extensionLists = ['jpg', 'gif', 'webp', 'png'];
    if(extensionLists.indexOf(event.split('.').pop()) >-1){
      return true;
    }else{return false;}

  }

  //load ảnh lên template
  showImg(event: any){
    console.log(event.target.value);
    if (this.checkFile(event.target.value)){
      this.checkTypeFile=false;
      if (event.target.files && this.imgList.length <5) {
        this.imgFireBaseList.push(event.target.files[0]);
        const reader = new FileReader();
        reader.readAsDataURL(event.target.files[0]);
        reader.onload = (event:any) =>{
          // this.url= event.target.files[0];
          this.imgList.push(event.target.result);
          for (let i = 0; i < this.imgList.length ; i++) {
            switch(i){
              case 0:
                this.url = this.imgList[0];
                break;
              case 1:
                this.url1 = this.imgList[1];
                break;
              case 2:
                this.url2 = this.imgList[2];
                break;
              case 3:
                this.url3 = this.imgList[3];
                break;
              case 4:
                this.url4 = this.imgList[4];
                break;
            }
          }
        }
      }
    }else {
     this.checkTypeFile = true;
    }


  }

  resetForm(){
    this.ngOnInit();
  }

  getCurrentDateTime(): string {
    return formatDate(new Date(), 'dd-MM-yyyyhhmmssa', 'en-US');
  }

}
