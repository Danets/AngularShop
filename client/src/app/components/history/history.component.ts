import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  AfterViewInit,
  OnDestroy,
} from '@angular/core';
import {
  MaterialService,
  ModalInterface,
} from '../../shared/helpers/material.service';
import { Order, Filter } from './../../shared/models/order';
import { Observable, Subscription } from 'rxjs';
import { OrdersService } from 'src/app/shared/services/orders.service';

const STEP = 2;

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css'],
})
export class HistoryComponent implements OnInit, AfterViewInit, OnDestroy {
  public orders: Order[] = [];
  public isFilter = false;
  public offset = 0;
  public limit = STEP;
  public loading = false;
  public reloading = false;
  public isMoreOrders = false;
  public filter: Filter = {};
  private subs = new Subscription();
  @ViewChild('tooltip') tooltipRef: ElementRef;
  tooltip: ModalInterface;

  constructor(private ordersService: OrdersService) {}

  ngOnInit(): void {
    this.fetchOrders();
    this.reloading = true;
  }

  ngAfterViewInit(): void {
    this.tooltip = MaterialService.initTooltip(this.tooltipRef);
  }

  ngOnDestroy(): void {
    this.tooltip.destroy();
    this.subs.unsubscribe();
  }

  private fetchOrders(): void {
    const params = {
      ...this.filter,
      offset: this.offset,
      limit: this.limit,
    };
    this.subs.add(
      this.ordersService.getOrders(params).subscribe((orders) => {
        this.orders = this.orders.concat(orders);
        this.isMoreOrders = orders.length < STEP;
        this.loading = false;
        this.reloading = false;
      })
    );
  }

  loadMore(): void {
    this.offset += STEP;
    this.loading = true;
    this.fetchOrders();
  }

  onOpenModal(): void {
    this.isFilter = !this.isFilter;
  }

  onFilter(filter: Filter): void {
    if (filter) {
      this.filter = filter;
    }
    this.orders = [];
    this.offset = 0;
    this.reloading = true;
    this.fetchOrders();
  }

 public isFilterExist(): boolean {
    return Object.keys(this.filter).length > 0
  }
}
