import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AdminProductsService {

  constructor(private httpClient: HttpClient) { }

  getProducts(params: any | undefined) {
    if (params) {
      return this.httpClient.get("/api/products", { params });
    }
    return this.httpClient.get("/api/products");
  }

  getDesktopProduct() {
    return this.httpClient.get("https://desktop.bg/grigs-grigs_absolute-grigs_challenger_white_amd");
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
