import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Order } from './../models/order';

@Injectable({
  providedIn: 'root',
})
export class OrdersService {
  constructor(private http: HttpClient) {}

  createOrder(order: Order): Observable<Order> {
    return this.http.post<Order>(`/api/orders`, order);
  }

  getOrders(params: any = {}): Observable<Order[]> {
    return this.http.get<Order[]>(`/api/orders`, {
      params: new HttpParams({ fromObject: params }),
    });
  }
}
