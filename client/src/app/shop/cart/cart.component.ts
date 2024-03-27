import { Component, OnInit } from '@angular/core';
import { ShopService } from '../shop.service';
import { Cart } from 'src/app/types/cart';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cart: Cart | undefined;

  constructor(private shopService: ShopService) {}

  ngOnInit(): void {
      this.shopService.getCart().subscribe((response: any) => {
        console.log(response);
        this.cart = response.data.cart;
      })
  }

  get isCartEmpty(): boolean {
    return !this.cart;
  }
}
