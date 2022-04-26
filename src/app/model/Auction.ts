import {Product} from './Product';
import {Member} from './Member';

export class Auction {
    id: number;
    currentBid: number;
    quantity: number;
    auctionTime: string;
    members: Member;
    product:Product;
}
