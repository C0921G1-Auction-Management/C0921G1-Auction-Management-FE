import {ProductLongTK} from "./ProductLongTK";
import {MemberLongTK} from "./MemberLongTK";

export class TransactionLongTK {
  id?: number;
  currrentBid?: number;
  transactionDate?: string;
  behavior?: number;
  product?: ProductLongTK;
  member?: MemberLongTK;
}
