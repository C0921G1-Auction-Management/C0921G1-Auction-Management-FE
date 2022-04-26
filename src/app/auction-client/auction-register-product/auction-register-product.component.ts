import {Component, Inject, OnInit} from '@angular/core';
import {CategoryProductTaiLM} from "../../model/category-product-tai-lm";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {RegisterProductTaiLMService} from "../../service/register-product-tai-lm.service";
import {CategoryProductTaiLMService} from "../../service/category-product-tai-lm.service";
import {CurrencyPipe, formatDate} from "@angular/common";
import {AngularFireStorage} from "@angular/fire/storage";
import {finalize} from "rxjs/operators";
import {ValidateDate} from "../../model/ValidateStartDate";




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
  money: number;
  validate: boolean = true;
  validateDate = new ValidateDate();
  constructor(private productTaiLMService: RegisterProductTaiLMService,
              private categoryProductTaiLMService: CategoryProductTaiLMService,
              private currencyPipe: CurrencyPipe,
              private fb: FormBuilder,
              @Inject(AngularFireStorage) private storage: AngularFireStorage) { }

  ngOnInit(): void {
    this.getListCategory();
    this.productForm = this.fb.group({
      name: new FormControl('',[Validators.required,Validators.pattern('^([A-ZĐ][a-zÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚÝàáâãèéêìíòóôõùúýĂăĐđĨĩŨũƠơƯưẠ-ỹ]+)( [A-ZĐ\\d][a-zÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚÝàáâãèéêìíòóôõùúýĂăĐđĨĩŨũƠơƯưẠ-ỹ]*)*$')]),
      startBid: new FormControl('',[Validators.required,Validators.min(5000),Validators.max(5000000)]),
      bidRange: new FormControl('',[Validators.required,Validators.min(5000)]),
      finalBid: new FormControl('',[Validators.required,Validators.min(50000)]),
      imageUrl: new FormControl('',[Validators.required,Validators.minLength(5),Validators.maxLength(2000)]),
      groupDate: new FormGroup({
        startDate: new FormControl('',[Validators.required,this.validateDate.checkStartDate]),
        endDate: new FormControl('',[Validators.required]),
      },this.validateDate.checkStartDateAndEndDate),
      description: new FormControl('',[Validators.required,Validators.maxLength(150),Validators.minLength(5)]),
      category: new FormControl('',[Validators.required]),
    })

    //currencyPipe pipe
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
    if(this.productForm.valid){
      this.productForm.get('startBid').setValue(this.formatStartBid(this.productForm.get('startBid').value));
      this.uploadImgFireBase();
      this.fomartDate(this.productForm.get('startDate').value,this.productForm.get('endDate').value)
      this.productTaiLMService.registerProduct(this.productForm.value).subscribe(value => {
      });
      this.validate = true;
    }else{
      this.validate = false;
    }

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
    if (this.checkFile(event.target.value)){
      if (event.target.files && this.imgList.length <5) {
        this.imgFireBaseList.push(event.target.files[0]);
        const reader = new FileReader();
        reader.readAsDataURL(event.target.files[0]);
        reader.onload = (event:any) =>{
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
     this.productForm.get('imgUrl').invalid;
    }


  }

  resetForm(){
    this.ngOnInit();
  }

  getCurrentDateTime() {
    return formatDate(new Date(), 'YYYY-MM-DD HH:mm:ss', 'en-US');
  }

  fomartDate(startDate: string, endDate: string){
    const startFomart = new Date(startDate);
    const endFomart = new Date(endDate);
    this.productForm.get('startDate').setValue(formatDate(startFomart, 'yyyy-MM-dd HH:mm:ss', 'en-US'));
    this.productForm.get('endDate').setValue(formatDate(endFomart, 'yyyy-MM-dd HH:mm:ss', 'en-US'));
  }



}
