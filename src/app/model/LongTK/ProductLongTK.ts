import {CategoryLongTK} from "./CategoryLongTK";
import {TransactionLongTK} from "./TransactionLongTK";

export class ProductLongTK {
  id?: number;
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
