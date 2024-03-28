import { Component, OnInit } from '@angular/core';
import { ShopService } from '../shop.service';
import { Cart } from 'src/app/types/cart';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

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

  constructor(private shopService: ShopService, private fb: FormBuilder, private router: Router) {}

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

      this.shopService.updateCart(products).subscribe(() => {
        this.shopService.getCart().subscribe((response: any) => {
          this.cart = response.data.cart;
        });
      });
    }
  }

  removeProductFromCart(productId: string) {
    if (!this.isCartEmpty) {
      let products = this.cart?.products || [];

      products = products.filter((item) => item.productId._id != productId);

      this.shopService.updateCart(products).subscribe(() => {
        this.shopService.getCart().subscribe((response: any) => {
          this.cart = response.data.cart;
        });
      });
    }
  }

  order() {
    if (this.orderForm.invalid) {
      return
    }

    console.log("Order form is valid!");
    // Order logic here
    const orderData = {
      products: this.cart?.products,
      name: this.orderForm.value.name,
      phone: this.orderForm.value.phone,
      address: this.orderForm.value.address
    }

    this.shopService.order(orderData).subscribe(() => {
      alert("Ordered successfully!");
      this.router.navigate(['/shop']);
    });
  }
}
