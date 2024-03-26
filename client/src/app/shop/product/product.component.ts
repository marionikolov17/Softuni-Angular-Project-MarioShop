import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ShopService } from '../shop.service';
import { Product } from 'src/app/types/product';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  product: Product | undefined;

  constructor(private activeRoute: ActivatedRoute, private shopService: ShopService) {}

  ngOnInit(): void {
      this.activeRoute.params.subscribe((data: any) => {
        this.shopService.getProduct(data.id).subscribe((response: any) => {
          console.log(response);
          this.product = response.data.product;
        });
      });
  }
}
