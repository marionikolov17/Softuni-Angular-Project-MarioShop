import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ShopService {

  constructor(private httpClient: HttpClient) { }

  getProducts() {
    return this.httpClient.get("/api/products");
  }

  getProduct(id: string) {
    return this.httpClient.get("/api/products/" + id);
  }

  getCart() {
    
  }
}
