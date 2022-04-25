import {Component, OnInit} from '@angular/core';
import {ProductLongTK} from "../../model/LongTK/ProductLongTK";
import {AuctionedLongTKService} from "../LongTKService/auctioned-long-tk.service";
import {ProductDTOLongTK} from "../../model/LongTK/ProductDTOLongTK";
import {Router} from "@angular/router";
import {DataLongtkService} from "../LongTKService/data-longtk.service";


@Component({
  selector: 'app-auction-client-auctioned',
  templateUrl: './auction-client-auctioned.component.html',
  styleUrls: ['./auction-client-auctioned.component.css']
})
export class AuctionClientAuctionedComponent implements OnInit {

  constructor(private  auctionedService: AuctionedLongTKService,
              private dataService: DataLongtkService,
              private router: Router,) {
  }

  idMember = 1;
  productPage: ProductDTOLongTK[] = [];
  allProductList: ProductDTOLongTK[] = [];
  errorMsg: string;
  p = 0;
  sumProductsPrice: number = 0;
  productQuantity: number = 0;

  ngOnInit(): void {
    this.getProductList(this.idMember, this.p);

    //Lấy product list dạng list từ data service, dùng khi click quay lại từ trang thanh toán
    // sau khi đã chọn sản phẩm
    this.dataService.takeReturnProductList.subscribe(value => {
      this.allProductList = value;
      if (this.allProductList.length == 0) {
        this.auctionedService.getListProduct(this.idMember).subscribe(value => {
          this.allProductList = value;
          for (let pro of this.allProductList) {
            this.auctionedService.getPrice(pro.id).subscribe(value => {
              pro.price = value;
            });
          }
        })
      } else {
        this.sumPrice()
      }
    })


  }

  totalPage: number;


  getProductList(memberId: number, page: number) {
    this.auctionedService.getAuctionedProduct(memberId, page).subscribe(value => {
      this.productPage = value['content'];
      this.changeStatus();
      this.totalPage = value['totalPages'];
      for (let pro of this.productPage) {
        this.auctionedService.getPrice(pro.id).subscribe(value => {
          pro.price = value;
        });
      }
    }, error => {
      this.errorMsg = 'Không có dữ liệu';
    });
  }

  nextPage() {
    if (this.p < this.totalPage - 1) {
      this.p++;
      this.getProductList(this.idMember, this.p);
    }
  }

  prePage() {
    if (this.p > 0) {
      this.p--;
      this.getProductList(this.idMember, this.p);

    }
  }

  addToPayList(event) {
    let payProId = (event.target.value);
    for (let product of this.allProductList) {
      if (product.id == payProId) {
        if (product.paymentStatus == 1) {
          product.paymentStatus = 2;
          this.productQuantity++;
          this.changeStatus();
          this.sumProductsPrice += Number(product.price);
        } else {
          product.paymentStatus = 1;
          this.productQuantity--;
          this.changeStatus();
          this.sumProductsPrice -= Number(product.price);
        }
      }
    }
  }

  sumPrice() {
    for (let pro of this.allProductList) {
      if (pro.paymentStatus == 2) {
        this.productQuantity++
        this.sumProductsPrice += pro.price
      }
    }
  }

  changeStatus() {
    for (let pro of this.allProductList) {
      for (let p of this.productPage) {
        if (p.id == pro.id) {
          p.paymentStatus = pro.paymentStatus
        }
      }
    }
  }

  complete() {
    this.router.navigateByUrl('/auction-client/paypal').then(r => {
      this.dataService.sendProductList(this.allProductList);
      this.dataService.sendPrice(this.sumProductsPrice);
      this.dataService.sendQuantity(this.productQuantity);
      this.dataService.sendMemberId(this.idMember);
    });
  }
}
