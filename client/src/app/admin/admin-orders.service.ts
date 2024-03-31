import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AdminOrdersService {

  constructor(private httpClient: HttpClient) { }

  getOrders() {
    return this.httpClient.get("/api/orders");
  }

  doneOrder(id: string) {
    return this.httpClient.patch(`/api/orders/${id}/done`, {});
  }
}
