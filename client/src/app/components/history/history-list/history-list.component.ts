import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Order } from 'src/app/shared/models/order';

@Component({
  selector: 'app-history-list',
  templateUrl: './history-list.component.html',
  styleUrls: ['./history-list.component.css'],
})
export class HistoryListComponent implements OnInit {
  @Input() orders: Order[];

  constructor() {}

  ngOnInit(): void {}

  computeOrder(order: Order): number {
    return order.list.reduce((acc, curr) => {
      return (acc += curr.amount * curr.cost);
    }, 0);
  }
}
