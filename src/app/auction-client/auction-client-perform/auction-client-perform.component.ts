import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AuctionServiceService} from '../../service/auction-service.service';
import {Auction} from '../../model/Auction';
import {Product} from '../../model/Product';
import {MatDialog} from '@angular/material/dialog';
import {DialogComponentComponent} from '../dialog-component/dialog-component.component';

@Component({
  selector: 'app-auction-client-perform',
  templateUrl: './auction-client-perform.component.html',
  styleUrls: ['./auction-client-perform.component.css']
})
export class AuctionClientPerformComponent implements OnInit {
  flagWinner: boolean = false;
  winner: Auction;
  auction: Auction;
  product: Product;
  auctionInfoList: Auction[];
  priceList: number[];
  currentPrice: number;
  photoList: string[];
  productPhoto: string;
  urlIMG1: string;
  urlIMG2: string;
  urlIMG3: string;
  urlIMG4: string;
  selectedPrice: number;
  page = 0;
  totalPage: number;
  seeMore = 4;
  days: any = '00';
  hours: any = '00';
  mins: any = '00';
  secs: any = '00';

  constructor(private activatedRoute: ActivatedRoute,
              private router: Router,
              private auctionService: AuctionServiceService,
              public dialog: MatDialog) {
  }

  ngOnInit(): void {
    const productId = this.activatedRoute.snapshot.params.id;
    this.getProductById(productId);
  }

  x = setInterval(() => {
    const featureDate = new Date(this.product.endDate).getTime();
    const today = new Date().getTime();
    const distance = featureDate - today;
    this.days = Math.floor(distance / (1000 * 60 * 60 * 24));
    this.hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    this.mins = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    this.secs = Math.floor((distance % (1000 * 60)) / (1000));
    if (this.days == 0 && this.hours == 0 && this.mins == 0 && this.secs == 0) {
      clearInterval(this.x);
      this.days = '00';
      this.hours = '00';
      this.mins = '00';
      this.secs = '00';
      this.auctionService.getInfoWinner().subscribe(value => {
        this.flagWinner = false;
        this.winner = value;
      }, error => {
        console.log('error in get information of winner');
      }, () => {
        this.openDialog();
      });
    }else if (this.secs == 0){
      this.auctionService.getInfoWinnerTemp().subscribe(value => {
        this.flagWinner =true;
        this.winner = value;
      }, error => {
        console.log('error in get information of winner 1');
      }, () => {
        this.openDialog();
      });
    }
    if (distance < 0) {
      clearInterval(this.x);
      this.days = '00';
      this.hours = '00';
      this.mins = '00';
      this.secs = '00';
    }
  }, 1000);

  getProductById(id: number) {
    this.auctionService.findById(id).subscribe(value => {
      this.product = value;
      this.currentPrice = this.product.startBid;
      this.productPhoto = this.product.imageUrl;
      this.photoList = this.productPhoto.split(',');
      for (let i = 0; i < this.photoList.length; i++) {
        this.urlIMG1 = this.photoList[0];
        this.urlIMG2 = this.photoList[1];
        this.urlIMG3 = this.photoList[2];
        this.urlIMG4 = this.photoList[3];
      }
    }, error => {
      console.log('error in get product by id');
    }, () => {
      this.getListInfoAuction();
      this.getListPrice();
      this.auctionService.getInfoWinnerTemp().subscribe(value => {
        this.winner = value;
        this.flagWinner =true;
      }, error => {
        console.log('error in get information of winner 2');
      });
    });
  }

  getListPrice() {
    this.auctionService.getListPrice(this.product.id, this.product.startBid).subscribe(value => {
      this.priceList = value;
    });
  }

  getListPriceFollowing() {
    this.auctionService.getListPrice(this.product.id, this.currentPrice).subscribe(value => {
      this.priceList = value;
    });
  }

  changCurrentPrice($event) {
    this.currentPrice = $event.target.value;
  }

  getListInfoAuction() {
    console.log('vo day');
    console.log(this.product.id);
    this.auctionService.getListAuctionMember(this.seeMore, this.page, this.product.id).subscribe(value => {
      this.auctionInfoList = value['content'];
      this.totalPage = value['totalPages'];
    });
  }

  nextPage() {
    this.seeMore += 4;
    this.auctionService.getListAuctionMember(this.seeMore, this.page, this.product.id).subscribe(data => {
      this.auctionInfoList = data['content'];
      this.totalPage = data['totalPages'];
    });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogComponentComponent, {
      height: '200px',
      width: '400px',
      data: {auction: this.winner, flag: this.flagWinner}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');

    });
  }

  getCurrentSelect(currentPrice) {
    this.selectedPrice = currentPrice;
    console.log(this.selectedPrice);
  }
}
