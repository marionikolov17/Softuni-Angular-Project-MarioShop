import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import {
  faHome,
  faCartPlus,
  faPlus,
  faSignOutAlt,
} from '@fortawesome/free-solid-svg-icons';
import { AdminProductsService } from '../admin-products.service';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.css'],
})
export class AdminPageComponent {
  /* Icons - FontAwesome */
  faHome = faHome;
  faCartPlus = faCartPlus;
  faPlus = faPlus;
  faSignOutAlt = faSignOutAlt;

  /* Pages toggles */
  isProductsPageShown: boolean = true;
  isOrdersPageShown: boolean = false;
  isCreatePageShown: boolean = false;
  isEditPageShown: boolean = false;

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

  createForm = this.fb.group({
    title: ['', [Validators.required]],
    description: ['', [Validators.required]],
    imageSrc: ['', [Validators.required]],
    category: ['', [Validators.required]],
    price: ['', [Validators.required]]
  });

  constructor(private fb: FormBuilder, private adminProductsService: AdminProductsService) {}

  onCreate() {
    if (this.createForm.invalid) {
      return
    }

    // Create product logic here
    this.adminProductsService.createProduct(this.createForm.value).subscribe(() => {
      this.showProductsPage();
    });
  }
}
