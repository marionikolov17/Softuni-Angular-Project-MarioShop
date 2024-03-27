import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { UserService } from 'src/app/shop/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  faCartShopping = faCartShopping;

  constructor(private userService: UserService, private router: Router) {}

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
