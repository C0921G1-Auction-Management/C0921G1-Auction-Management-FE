import {TransactionLongTK} from "./TransactionLongTK";
import {CategoryLongTK} from "./CategoryLongTK";

export class ProductDTOLongTK {
  constructor(value: any) {
  }

  id?: number;
  price?: number;
  name?: string;
  startBid?: string;
  bidRange?: string;
  finalBid?: number;
  imageUrl?: string;
  startDate?: string;
  endDate?: string;
  approvedStatus?: number;
  description?: string;
  paymentStatus?: number;
  timeRemaining?: string;
  productAddress?: string;
  transactions?: TransactionLongTK;
  category?: CategoryLongTK;


}
