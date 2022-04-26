import {Component, OnInit} from '@angular/core';
import {AuctionedLongTKService} from "../LongTKService/auctioned-long-tk.service";
import {ProductDTOLongTK} from "../../model/LongTK/ProductDTOLongTK";
import {MemberLongTK} from "../../model/LongTK/MemberLongTK";

import {Router} from "@angular/router";
import {DataLongtkService} from "../LongTKService/data-longtk.service";

declare var paypal;
let finalPay: string;


@Component({
  selector: 'app-auction-client-paypal',
  templateUrl: './auction-client-paypal.component.html',
  styleUrls: ['./auction-client-paypal.component.css']
})
export class AuctionClientPaypalComponent implements OnInit {

  constructor(private  auctonedSerivce: AuctionedLongTKService,
              private dataService: DataLongtkService,
              private router: Router) {
  }

  payPrice: string
  productList: ProductDTOLongTK[] = [];
  quantity: number;
  totalProductPrice: number;
  totalPrice: number;
  mailList: string;
  member: MemberLongTK;
  memberAddress: string;
  memberCity = 'Hà Nội';
  deliveryNote: string;
  citiesList: string[];
  isLoaded: boolean = false;
  deliveryStyle = '(No)';
  usdToVndRate: number;
  isPaypalLoad: boolean = false;

  ngOnInit(): void {
    this.dataService.takeMemberId.subscribe(value => {
      let id = 1;
      this.auctonedSerivce.findMemberById(id).subscribe(foundMember => {
        this.member = foundMember;
        this.isLoaded = true;
        this.memberAddress = this.member.address;

        this.citiesList = this.dataService.getFullcityList();

        this.auctonedSerivce.oneUsdToVndRate().subscribe(value => {
          this.usdToVndRate = Number(value.USD_VND);
          document.getElementById("deliveryToHome").click();
          if (this.isPaypalLoad == false) {
            this.callPaypal();
          }


        })
      })
    })


    let contentProduct: string;

    this.dataService.takeProductList.subscribe(value => {
      this.productList = value;

      for (let pro of this.productList) {
        contentProduct += '<tr> ' +
          '<td>' + pro.name + ' </td>' +
          '<td> ' + pro.price + '</td>' +
          '</tr>';
      }
      this.mailList = '<table>' + contentProduct + '</table>'
    });

    this.dataService.takeQuantity.subscribe(value => {
      this.quantity = value;
    });

    this.dataService.takeTotalPrice.subscribe(value => {
      this.totalProductPrice = value;
      this.totalPrice = this.totalProductPrice + 49000;
    });
    document.getElementById("defaultOpen").click();
  }

  sendMail(price: string) {
    this.auctonedSerivce.sendMail(this.member.email, price, this.quantity, this.deliveryNote).subscribe(value => {
    })
  }

  callPaypal() {
    this.isPaypalLoad = true;

    let t = this;
    paypal.Button.render({

      // Configure environment
      env: 'sandbox',
      client: {
        sandbox: 'demo_sandbox_client_id',
        production: 'demo_production_client_id'
      },
      // Customize button (optional)
      locale: 'en_US',
      style: {
        size: 'large',
        color: 'gold',
        shape: 'pill',
      },

      commit: true,

      // LongTK Set up a payment
      payment: function (data, actions) {
        return actions.payment.create({
          transactions: [{
            amount: {
              total: finalPay,
              currency: 'USD'
            }
          }]
        });

      },
      // Execute the payment
      onAuthorize: function (data, actions) {
        return actions.payment.execute().then(function () {
          // Show a confirmation message to the buyer

          // cần có biến t = this để gọi method sendMail - > là cái gọi qua API sendmail bên back end
          t.sendMail(finalPay);

        });
      }
    }, '#paypal-button')
  }


  choseCity(event) {
    this.memberCity = (event.target.value);
  }

  changeAddress(event) {
    this.memberAddress = event.target.value;
  }

  note(event) {
    this.deliveryNote = event.target.value;
  }

  returnToCart() {
    this.router.navigateByUrl('/auction-client/auctioned').then(value => {
      this.dataService.sendReturnProductList(this.productList)
    })
  }


  deliveryCost(event) {
    let deliveryType = Number(event.target.value);
    switch (deliveryType) {
      case 1:
        this.deliveryStyle = 'Phí giao hàng (Tận nơi): 49.000 ₫'
        this.getTotalPrice(49000)
        break;
      case 2:
        this.deliveryStyle = 'Phí giao hàng (Tiêu chuẩn): 39.000 ₫'
        this.getTotalPrice(39000)
        break;
      case 3:
        this.deliveryStyle = 'Nhận hàng trực tiếp'
        this.totalPrice = this.totalProductPrice;
        if (this.totalPrice > 150000) {
          this.totalPrice -= 150000;
        }
        this.payPrice = Number(this.totalPrice / this.usdToVndRate).toFixed(2);
        finalPay = this.payPrice;
        break;
    }
  }

  getTotalPrice(cost: number) {
    this.totalPrice = this.totalProductPrice + cost;
    this.payPrice = Number(this.totalPrice / this.usdToVndRate).toFixed(2);
    finalPay = this.payPrice;
  }
}
