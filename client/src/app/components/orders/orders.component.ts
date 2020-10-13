import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  OnDestroy,
} from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { MaterialService } from '../../shared/helpers/material.service';
import { OrderService } from './order.service';
import { OrdersService } from './../../shared/services/orders.service';
import { ModalInterface } from '../../shared/helpers/material.service';
import { OrderPosition, Order } from '../../shared/models/order';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css'],
  providers: [OrderService],
})
export class OrdersComponent implements OnInit, OnDestroy {
  isRoot: boolean;
  @ViewChild('modal', { static: true }) modalRef: ElementRef;
  modal: ModalInterface;
  subs: Subscription;
  isPending = false;
  orderSub: Subscription;
  constructor(
    private router: Router,
    public orderService: OrderService,
    private orders: OrdersService
  ) {}

  ngOnInit(): void {
    this.subs = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.isRoot = this.router.url === '/orders';
      }
    });
    this.modal = MaterialService.modalInit(this.modalRef);
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
    this.modal.destroy();
    if (this.orderSub) {
      this.orderSub.unsubscribe();
    }
  }

  openModal() {
    this.modal.open();
  }

  closeModal() {
    this.modal.close();
  }

  submitModal() {
    this.isPending = true;
    const order: Order = {
      list: this.orderService.list.map((order) => {
        delete order._id;
        return order;
      }),
    };
    this.orderSub = this.orders.createOrder(order).subscribe((res) => {
      MaterialService.handleError(
        `your order has been accepted by № ${res.order}`
      );
    });
    this.isPending = false;
    this.orderService.clear();
    this.modal.close();
  }

  onRemoveFromOrder(position: OrderPosition) {
    this.orderService.remove(position);
  }
}
