import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import {
  faHome,
  faCartPlus,
  faPlus,
  faSignOutAlt,
} from '@fortawesome/free-solid-svg-icons';
import { AdminProductsService } from '../admin-products.service';
import { Product } from 'src/app/types/product';
import { AdminOrdersService } from '../admin-orders.service';
import { Order } from 'src/app/types/order';
import { AdminAuthService } from '../admin-auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.css'],
})
export class AdminPageComponent implements OnInit {
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
    this.fetchProducts();
  }

  showOrdersPage() {
    this.isProductsPageShown = false;
    this.isOrdersPageShown = true;
    this.isCreatePageShown = false;
    this.isEditPageShown = false;
    this.fetchOrders();
  }

  showCreatePage() {
    this.isProductsPageShown = false;
    this.isOrdersPageShown = false;
    this.isCreatePageShown = true;
    this.isEditPageShown = false;
  }

  showEditPage() {
    this.isProductsPageShown = false;
    this.isOrdersPageShown = false;
    this.isCreatePageShown = false;
    this.isEditPageShown = true;
  }

  createForm = this.fb.group({
    title: ['', [Validators.required]],
    description: ['', [Validators.required]],
    imageSrc: ['', [Validators.required]],
    category: ['', [Validators.required]],
    price: ['', [Validators.required]],
  });

  editProduct: Product | undefined = undefined;
  products: Product[] | undefined;
  orders: Order[] | undefined;

  editForm = this.fb.group({
    title: ['', [Validators.required]],
    description: ['', [Validators.required]],
    imageSrc: ['', [Validators.required]],
    category: ['', [Validators.required]],
    price: ['', [Validators.required]],
  });

  constructor(
    private fb: FormBuilder,
    private adminProductsService: AdminProductsService,
    private adminOrdersService: AdminOrdersService,
    private adminAuthService: AdminAuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.fetchProducts();
  }

  // Products logic
  fetchProducts() {
    this.adminProductsService.getProducts().subscribe((response: any) => {
      this.products = response.data.products;
    });
  }

  setEditProduct(product: Product) {
    this.editProduct = product;
    this.editForm.controls.title.setValue(product.title);
    this.editForm.controls.description.setValue(product.description);
    this.editForm.controls.imageSrc.setValue(product.imageSrc);
    this.editForm.controls.category.setValue(product.category);
    this.editForm.controls.price.setValue(product.price + "");
    this.showEditPage();
  }

  onCreate() {
    if (this.createForm.invalid) {
      return;
    }

    // Create product logic here
    this.adminProductsService
      .createProduct(this.createForm.value)
      .subscribe(() => {
        this.fetchProducts();
        this.showProductsPage();
      });
  }

  onEdit() {
    if (this.editForm.invalid) {
      return;
    }

    // Edit product logic here
    this.adminProductsService.updateProduct(this.editForm.value, this.editProduct?._id || "").subscribe(() => {
      this.fetchProducts();
      this.showProductsPage();
    })
  }

  deleteProduct(id: string) {
    if (confirm("Are you sure?")) {
      this.adminProductsService.deleteProduct(id).subscribe(() => {
        this.fetchProducts();
      });
    }
  }

  toggleActiveProduct(event: any, product: Product) {
    this.adminProductsService.updateProduct({...product, isActive: event.target.checked }, product._id).subscribe(() => {
      this.fetchProducts();
    })
  }

  createDesktopProduct() {
    this.adminProductsService.getDesktopProduct().subscribe((response:any) => {
      console.log(response)
    })
  }

  // Orders logic
  fetchOrders() {
    this.adminOrdersService.getOrders().subscribe((response: any) => {
      this.orders = response.data.orders;
    });
  }

  get totalOrders(): number {
    let count = 0;
    this.orders?.forEach(order => {
      if (!order.isDone) count++;
    })
    return count;
  }

  doneOrder(id: string) {
    this.adminOrdersService.doneOrder(id).subscribe(() => {
      this.fetchOrders();
    });
  }

  // Auth
  logout() {
    this.adminAuthService.logout()
    this.router.navigate(['/admin/login'])
  }
}
