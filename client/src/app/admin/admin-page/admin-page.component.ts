import { Component } from '@angular/core';
import { faHome, faCartPlus, faPlus, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.css']
})
export class AdminPageComponent {
  /* Icons - FontAwesome */
  faHome = faHome;
  faCartPlus = faCartPlus;
  faPlus = faPlus;
  faSignOutAlt = faSignOutAlt;

  /* Pages toggles */
  isProductsPageShown: boolean = false;
  isOrdersPageShown: boolean = false;
  isCreatePageShown: boolean = false;
  isEditPageShown: boolean = true;

  /* Pages toggles functions */
  showProductsPage() {
    this.isProductsPageShown = true;
    this.isOrdersPageShown = false;
    this.isCreatePageShown = false;
    this.isEditPageShown = false;
  }

  showOrdersPage() {
    this.isProductsPageShown = false;
    this.isOrdersPageShown = true;
    this.isCreatePageShown = false;
    this.isEditPageShown = false;
  }

  showCreatePage() {
    this.isProductsPageShown = false;
    this.isOrdersPageShown = false;
    this.isCreatePageShown = true;
    this.isEditPageShown = false;
  }
}
