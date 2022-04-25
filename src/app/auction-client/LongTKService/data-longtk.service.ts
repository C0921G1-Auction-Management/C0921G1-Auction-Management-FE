import {Injectable} from '@angular/core';
import {ProductDTOLongTK} from "../../model/LongTK/ProductDTOLongTK";
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class DataLongtkService {


  product: ProductDTOLongTK[] = [];
  returnProduct: ProductDTOLongTK[] = [];

  private returnProductList = new BehaviorSubject(this.returnProduct);
  takeReturnProductList = this.returnProductList.asObservable();

  private allProductList = new BehaviorSubject(this.product);
  takeProductList = this.allProductList.asObservable();

  private price = new BehaviorSubject(0);
  takeTotalPrice = this.price.asObservable();

  private quantity = new BehaviorSubject(0);
  takeQuantity = this.quantity.asObservable();

  private memberId = new BehaviorSubject(0);
  takeMemberId = this.memberId.asObservable();

  constructor() {
  }


  sendMemberId(memberId: number) {
    this.memberId.next(memberId);
  }

  sendReturnProductList(prodList: ProductDTOLongTK[]) {
    this.returnProductList.next(prodList);
  }

  sendProductList(prodList: ProductDTOLongTK[]) {
    this.allProductList.next(prodList);
  }

  sendPrice(price: number) {
    this.price.next(price);
  }

  sendQuantity(quant: number) {
    this.quantity.next(quant);
  }


  getFullcityList() {
    return ['Hòa Bình',
      'Sơn La', 'Điện Biên', 'Lai Châu', 'Lào Cai', 'Yên Bái', 'Phú Thọ', 'Hà Giang', 'Tuyên Quang', 'Cao Bằng',
      'Bắc Kạn', 'Thái Nguyên', 'Lạng Sơn', 'Bắc Giang', 'Quảng Ninh', 'Hà Nội', 'Bắc Ninh',
      'Hà Nam', 'Hải Dương', 'Hải Phòng', 'Hưng Yên', 'Nam Định', 'Thái Bình', 'Vĩnh Phúc', 'Ninh Bình',
      'Thanh Hóa', 'Nghệ An', 'Hà Tĩnh', 'Quảng Bình', 'Quảng Trị', 'Thừa Thiên Huế', 'Đà Nẵng', 'Quảng Nam',
      'Quảng Ngãi', 'Bình Định', 'Phú Yên', 'Khánh Hòa', 'Ninh Thuận', 'Bình Thuận', 'Kon Tum',
      'Gia Lai', 'Đắk Lắk', 'Đắk Nông', 'Lâm Đồng', 'TP Hồ Chí Minh', 'Bà Rịa Vũng Tàu', 'Bình Dương', 'Bình Phước',
      'Đồng Nai', 'Tây Ninh', 'An Giang', 'Bạc Liêu', 'Bến Tre', 'Cà Mau', 'Cần Thơ', 'Đồng Tháp', 'Hậu Giang',
      'Kiên Giang', 'Long An', 'Sóc Trăng', 'Tiền Giang', 'Trà Vinh', 'Vĩnh Long',
    ];
  }
}
