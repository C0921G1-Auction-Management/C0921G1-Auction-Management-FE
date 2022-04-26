import {Auction} from './Auction';

export class Member {
  id: number;
  name: string;
  dayOfBirth: string;
  address: string;
  phoneNumber: string;
  gender: number;
  email: string;
  point: number;
  lockFlag: number;
  deleteFlag: number;
  warning: number;
  totalMoney: number;
  auctions?: Auction;
}
