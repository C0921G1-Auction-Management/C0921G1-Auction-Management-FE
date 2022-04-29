import {Component, OnInit} from '@angular/core';
import {AuctionedLongTKService} from "../LongTKService/auctioned-long-tk.service";
import {ProductDTOLongTK} from "../../model/LongTK/ProductDTOLongTK";
import {MemberLongTK} from "../../model/LongTK/MemberLongTK";
import Swal from 'sweetalert2/dist/sweetalert2.js';
import {Router} from "@angular/router";
import {DataLongtkService} from "../LongTKService/data-longtk.service";
import {animate, AUTO_STYLE, state, style, transition, trigger} from "@angular/animations";
import {FormControl, FormGroup, Validators} from "@angular/forms";

declare var paypal;
let finalPay: string;

const DEFAULT_DURATION = 300;

@Component({
  selector: 'app-auction-client-paypal',
  templateUrl: './auction-client-paypal.component.html',
  styleUrls: ['./auction-client-paypal.component.css'],
  animations: [
    trigger('collapse', [
      state('false', style({height: AUTO_STYLE, visibility: AUTO_STYLE})),
      state('true', style({height: '0', visibility: 'hidden'})),
      transition('false => true', animate(DEFAULT_DURATION + 'ms ease-in')),
      transition('true => false', animate(DEFAULT_DURATION + 'ms ease-out'))
    ])
  ]
})
export class AuctionClientPaypalComponent implements OnInit {

  constructor(private  auctonedSerivce: AuctionedLongTKService,
              private dataService: DataLongtkService,
              private router: Router,
  ) {
  }

  payPrice: string
  productList: ProductDTOLongTK[] = [];
  quantity: number;
  totalProductPrice: number;
  totalPrice: number;
  member: MemberLongTK;
  memberAddress: string;
  memberCity = 'Hà Nội';
  deliveryNote: string;
  citiesList: string[];
  isLoaded: boolean = false;
  deliveryStyle = '(No)';
  usdToVndRate: number;
  isPaypalLoad: boolean = false;
  collapsedAgri = true;
  collapsedAcb = true;
  collapsedVietkom = true;
  bankForm: FormGroup;

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

    this.dataService.takeProductList.subscribe(value => {
      this.productList = value;
      console.log(this.productList)
    });
    this.dataService.takeQuantity.subscribe(value => {
      this.quantity = value;
    });
    this.dataService.takeTotalPrice.subscribe(value => {
      this.totalProductPrice = value;
      this.totalPrice = this.totalProductPrice + 49000;
    });
    document.getElementById("secondOpen").click();
    // document.getElementById("defaultOpen").click();

    this.bankForm = new FormGroup({
      bankCode: new FormControl('', Validators.required),
      pinCode: new FormControl('', Validators.required)
    });
  }

  payProductIdList() {
    let listId: string = '';
    for (let pro of this.productList) {
      if (pro.paymentStatus == 2) {
        listId += pro.id + ',';
      }
    }
    console.log(listId)
    return listId;
  }

  confirmBank() {
    let phone = this.member.phoneNumber;
    let timerInterval;
    let t = this;
    Swal.fire({
      icon: 'success',
      title: 'XÁC NHẬN',
      html: 'OTP đã được gửi qua số điện thoại <strong>' + phone + '</strong> trong ít phút nữa <br>' +
        'Quý khách vui lòng xác nhận tin nhắn giao dịch',
      timer: 2300,
      didOpen: () => {
        Swal.showLoading()
        const b = Swal.getHtmlContainer().querySelector('b')
        timerInterval = setInterval(() => {
          b.textContent = Swal.getTimerLeft()
        }, 100)
      },
      willClose: () => {
        clearInterval(timerInterval)
      }
    }).then((result) => {
      /* Read more about handling dismissals below */
      if (result.dismiss === Swal.DismissReason.timer) {
        console.log('I was closed by the timer')
        this.auctonedSerivce.changeProductStatus(this.payProductIdList()).subscribe();
        this.removeProduct();

      }
    })
  }

  removeProduct() {
    this.productList.splice(0, this.productList.length);
    if (this.productList.length == 0) {
      this.dataService.sendReturnProductList(this.productList)
      this.router.navigate(['/auction-client/auctioned']);
    }
  }

  switchShowHideAgri() {
    this.collapsedAcb = true;
    this.collapsedVietkom = true;
    if (this.collapsedAgri == false) {
      this.collapsedAgri = true;
    } else {
      this.collapsedAgri = false
    }
  }

  switchShowHideAcb() {
    this.collapsedAgri = true;
    this.collapsedVietkom = true;
    if (this.collapsedAcb == false) {
      this.collapsedAcb = true;
    } else {
      this.collapsedAcb = false
    }
  }

  switchShowHideVietkom() {
    this.collapsedAgri = true;
    this.collapsedAcb = true;
    if (this.collapsedVietkom == false) {
      this.collapsedVietkom = true;
    } else {
      this.collapsedVietkom = false
    }
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
          t.sendMail(finalPay);
          t.removeProduct();
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
