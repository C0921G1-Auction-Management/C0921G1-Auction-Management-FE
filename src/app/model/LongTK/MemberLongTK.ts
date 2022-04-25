import {TransactionLongTK} from "./TransactionLongTK";

export class MemberLongTK {
  id?: number;
  name?: string;
  dayOfBirth?: string;
  address?: string;
  phoneNumber?: string;
  gender?: number;
  email?: string;
  point?: number;
  lockFlag?: number;
  deleteFlag?: number;
  warning?: number;
  totalMoney?: number;
  transactions?: TransactionLongTK;
}
