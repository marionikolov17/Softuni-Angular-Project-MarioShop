import { Component } from '@angular/core';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { UserService } from 'src/app/shop/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  faCartShopping = faCartShopping;

  constructor(private userService: UserService) {}

  get isLoggedIn(): boolean {
    return this.userService.isLoggedIn;
  }

  get username(): string {
    return this.userService.user?.username || "";
  }
}
