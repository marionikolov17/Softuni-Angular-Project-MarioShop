import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { ShopService } from 'src/app/shop/shop.service';
import { UserService } from 'src/app/shop/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  faCartShopping = faCartShopping;
  totalProductsInCart: number = 0;

  searchForm = this.fb.group({
    search: ['', [Validators.required]],
  });

  constructor(
    private userService: UserService,
    private router: Router,
    private shopService: ShopService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    if (this.userService.user) {
      this.getCartLength();

      this.router.events.subscribe(() => {
        this.getCartLength();
      });
    }
  }

  getCartLength() {
    this.shopService.getCart().subscribe({
      next: (response: any) => {
        console.log("cart", response)
        this.totalProductsInCart = response.data.cart.products.length;
      },
      error: () => {
        return;
      },
    });
  }

  get isLoggedIn(): boolean {
    return this.userService.isLoggedIn;
  }

  get username(): string {
    return this.userService.user?.username || '';
  }

  logout(): void {
    this.userService.logout();
    this.router.navigate(['/auth/login']);
  }

  search() {
    if (this.searchForm.invalid) {
      return;
    }

    this.router.navigate(['/shop'], {
      queryParams: { search: this.searchForm.value.search },
    });
  }
}
