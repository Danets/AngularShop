import { Injectable } from '@angular/core';
import { OrderPosition } from '../../shared/models/order';
import { Position } from '../../shared/models/position';

// @Injectable({
//   providedIn: 'root'
// })
export class OrderService {
  public list: OrderPosition[] = [];
  public total: number = 0;

  add(position: Position) {
    const positionForOrder: OrderPosition = Object.assign(
      {},
      {
        name: position.name,
        cost: position.cost,
        amount: position.amount,
        _id: position._id,
      }
    );
    const existPosition = this.list.find(
      (pos) => pos._id === positionForOrder._id
    );
    if (existPosition) {
      existPosition.amount += positionForOrder.amount;
    } else {
      // this.list.push(positionForOrder);
      this.list  = [...this.list, positionForOrder];
    }
    this.countTotal();
  }

  remove(position: OrderPosition) {
    this.list = this.list.filter((pos) => pos._id !== position._id);
    this.countTotal();
  }

  private countTotal() {
    this.total = this.list.reduce((acc, pos) => {
      acc += pos.amount * pos.cost;
      return acc;
    }, 0);
  }

  clear() {
    this.list = [];
    this.total = 0;
  }
}
