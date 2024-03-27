import { Component, OnInit } from '@angular/core';
import { ShopService } from '../shop.service';
import { Cart } from 'src/app/types/cart';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  cart: Cart | undefined;

  constructor(private shopService: ShopService) {}

  ngOnInit(): void {
    this.shopService.getCart().subscribe((response: any) => {
      console.log(response);
      this.cart = response.data.cart;
    });
  }

  get isCartEmpty(): boolean {
    return !this.cart;
  }

  updateProductQuantity(event: any, productId: any) {
    if (!this.isCartEmpty) {
      let product = this.cart?.products?.find((item) => {
        return item.productId._id == productId;
      });
      let products = this.cart?.products || [];
      for (let i = 0; i < products.length; i++) {
        if (products[i].productId._id == product?.productId._id) {
          products[i].quantity = +event.target.value;
        }
      }

      const newCart = {...this.cart, products};
      //console.log(newCart);

      this.shopService.updateCart(products).subscribe(() => {
        this.shopService.getCart().subscribe((response: any) => {
          //console.log(response);
          this.cart = response.data.cart;
        });
      });
    }
  }

  removeProductFromCart(productId: string) {}
}
