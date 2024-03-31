import { Product } from "./product";
import { User } from "./user";

export interface Order {
  _id: string;
  userId: User;
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
