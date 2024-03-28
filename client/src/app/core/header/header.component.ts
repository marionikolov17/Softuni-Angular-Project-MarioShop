import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { ShopService } from 'src/app/shop/shop.service';
import { UserService } from 'src/app/shop/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  faCartShopping = faCartShopping;
  totalProductsInCart: number = 0;

  constructor(private userService: UserService, private router: Router, private shopService: ShopService) {}

  ngOnInit(): void {
      if (this.isLoggedIn) {
        this.shopService.getCart().subscribe((response: any) => {
          this.totalProductsInCart = response.data.cart.products.length;
        })
      }
  }

  get isLoggedIn(): boolean {
    return this.userService.isLoggedIn;
  }

  get username(): string {
    return this.userService.user?.username || "";
  }

  logout(): void {
    this.userService.logout();
    this.router.navigate(['/auth/login']);
  }
}
