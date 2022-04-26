import {CategoryProductTaiLM} from "./category-product-tai-lm";

export class ProductTaiLM {
  name: string;
  startBid: number;
  bidRange: number;
  finalBid: number;
  imageUrl: string;
  startDate: string;
  endDate: string;
  description: string;
  category: CategoryProductTaiLM[];


  constructor() {
  }
}
