import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  isCategoryOpened: boolean = false;

  toggle() {
    this.isCategoryOpened = !this.isCategoryOpened
  }
}
