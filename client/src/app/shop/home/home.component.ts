import { Component, OnInit } from '@angular/core';
import { ShopService } from '../shop.service';
import { Product } from 'src/app/types/product';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  products: Product[] | undefined;
  isCategoryOpened: boolean = false;
  isSortOpened: boolean = false;
  minPrice: number = 0;
  maxPrice: number = 10000;

  isLoading: boolean = true;

  constructor(
    private shopService: ShopService,
    private activeRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.activeRoute.queryParamMap.subscribe((params: any) => {
      this.loadProducts(this.activeRoute.snapshot.queryParams);
      // Change input parameters
      this.minPrice = +this.activeRoute.snapshot.queryParams['minPrice'] || 0;
      this.maxPrice = +this.activeRoute.snapshot.queryParams['maxPrice'] || 10000;
    });
  }

  loadProducts(queryParams: any) {
    this.isLoading = true;
    this.shopService.getProducts(queryParams).subscribe((response: any) => {
      //console.log(response.data);
      this.products = response.data.products;
      this.isLoading = false;
    });
  }

  toggle() {
    this.isCategoryOpened = !this.isCategoryOpened;
  }

  toggleSort() {
    this.isSortOpened = !this.isSortOpened;
  }

  changeCategory(category: string) {
    const newParams = {
      ...this.activeRoute.snapshot.queryParams,
      category: category,
    };
    this.router.navigate(['/shop'], { queryParams: newParams });
    this.loadProducts(newParams);
  }

  changeMinPrice(event: any) {
    const newParams = {
      ...this.activeRoute.snapshot.queryParams,
      minPrice: event.target.value,
    };
    this.minPrice = +event.target.value;
    this.router.navigate(['/shop'], { queryParams: newParams });
    this.loadProducts(newParams);
  }

  changeMaxPrice(event: any) {
    const newParams = {
      ...this.activeRoute.snapshot.queryParams,
      maxPrice: event.target.value,
    };
    this.maxPrice = +event.target.value;
    this.router.navigate(['/shop'], { queryParams: newParams });
    this.loadProducts(newParams);
  }

  changeSortBy(sortBy: string) {
    const newParams = { ...this.activeRoute.snapshot.queryParams, sortBy };
    this.router.navigate(['/shop'], { queryParams: newParams });
    this.loadProducts(newParams);
  }
}
