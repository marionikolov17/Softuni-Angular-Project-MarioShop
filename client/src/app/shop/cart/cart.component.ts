import { Component, OnInit } from '@angular/core';
import { ShopService } from '../shop.service';
import { Cart } from 'src/app/types/cart';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  cart: Cart | undefined;
  orderForm = this.fb.group({
    name: ['', [Validators.required]],
    phone: ['', [Validators.required, Validators.minLength(10)]],
    address: ['', [Validators.required]]
  });

  constructor(private shopService: ShopService, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.shopService.getCart().subscribe((response: any) => {
      console.log(response);
      this.cart = response.data.cart;
    });
  }

  get isCartEmpty(): boolean {
    return this.cart?.products.length ? false : true;
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

  removeProductFromCart(productId: string) {
    if (!this.isCartEmpty) {
      let products = this.cart?.products || [];

      products = products.filter((item) => item.productId._id != productId);
      //console.log(products)
      this.shopService.updateCart(products).subscribe(() => {
        this.shopService.getCart().subscribe((response: any) => {
          //console.log(response);
          this.cart = response.data.cart;
        });
      });
    }
  }

  order() {
    
  }
}
