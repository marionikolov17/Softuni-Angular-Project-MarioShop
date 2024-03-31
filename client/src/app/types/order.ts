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
  productId: string;
  quantity: number;
  _id: string
}
