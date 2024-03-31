import { Product } from "./product";

export interface Order {
  _id: string;
  userId: string;
  products: ProductsArr[];
  name: string;
  phone: string;
  address: string;
  isDone: boolean;
  __v: number
}

interface ProductsArr {
  productId: Product;
  quantity: number;
  _id: string
}
