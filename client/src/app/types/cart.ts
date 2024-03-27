import { Product } from "./product"

export interface Cart {
  _id: string,
  userId: string,
  products: cartProduct[],
  __v: number
}

interface cartProduct {
  productId: Product,
  quantity: number,
  _id: string
}
