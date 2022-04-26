import {Auction} from './Auction';

export class Product {
  id: number;
  name: string;
  startBid: number;
  bidRange: number;
  finalBid: number;
  imageUrl: string;
  startDate: string;
  endDate: string;
  approvedStatus: number;
  description: string;
  paymentStatus: number;
  timeRemaining: string;
  productAddress: string;
  auctions?: Auction;
}
