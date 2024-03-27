import { Product } from "./product"

export interface Cart {
  _id: string,
  userId: string,
  products: Array<cartProduct>,
  __v: number
}

interface cartProduct {
  productId: Product,
  quantity: number,
  _id: string
}
