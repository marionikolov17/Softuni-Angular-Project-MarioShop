import { Component, OnInit } from '@angular/core';
import { ShopService } from '../shop.service';
import { Product } from 'src/app/types/product';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  products: Product[] | undefined;
  isCategoryOpened: boolean = false;
  isSortOpened: boolean = false;

  constructor(private shopService: ShopService) {}

  ngOnInit(): void {
      this.shopService.getProducts().subscribe((response: any) => {
        console.log(response.data);
        this.products = response.data.products;
      })
  }

  toggle() {
    this.isCategoryOpened = !this.isCategoryOpened
  }

  toggleSort() {
    this.isSortOpened = !this.isSortOpened;
  }
}
