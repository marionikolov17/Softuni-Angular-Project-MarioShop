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

  updateProduct(data: any, id: string) {
    return this.httpClient.put(`/api/products/${id}`, data);
  }

  deleteProduct(id: string) {
    return this.httpClient.delete(`/api/products/${id}`);
  }
}
