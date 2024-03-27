import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ShopService } from '../shop.service';
import { Product } from 'src/app/types/product';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  product: Product | undefined;

  constructor(private activeRoute: ActivatedRoute, private shopService: ShopService, private router: Router) {}

  ngOnInit(): void {
      this.activeRoute.params.subscribe((data: any) => {
        this.shopService.getProduct(data.id).subscribe((response: any) => {
          console.log(response);
          this.product = response.data.product;
        });
      });
  }

  addToCart() {
    this.shopService.getCart().subscribe((response: any) => {
      const products = response.data.cart.products;
      products.push({ productId: this.product?._id });
      this.shopService.updateCart(products).subscribe(() => {
        this.router.navigate(['/shop/cart']);
      })
    })
  }
}
