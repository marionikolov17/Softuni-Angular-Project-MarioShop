import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AdminProductsService {

  constructor(private httpClient: HttpClient) { }

  getProducts() {
    return this.httpClient.get("/api/products");
  }

  createProduct(data: any) {
    return this.httpClient.post("/api/products", data);
  }

  updateProduct() {

  }

  deleteProduct() {

  }
}
