import { Component, OnInit } from '@angular/core';
import { ShopService } from '../shop.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  constructor(private shopService: ShopService) {}

  ngOnInit(): void {
      this.shopService.getCart().subscribe((data) => {
        console.log(data);
      })
  }
}
