import {
  Component,
  ElementRef,
  Input,
  ViewChild,
  AfterViewInit,
  OnDestroy
} from '@angular/core';
import { Observable } from 'rxjs';
import { Order } from 'src/app/shared/models/order';
import {
  MaterialService,
  ModalInterface,
} from './../../../shared/helpers/material.service';

@Component({
  selector: 'app-history-list',
  templateUrl: './history-list.component.html',
  styleUrls: ['./history-list.component.css'],
})
export class HistoryListComponent implements AfterViewInit, OnDestroy {
  @Input() orders: Order[];
  @ViewChild('modal') modalRef: ElementRef;
  modal: ModalInterface;
  public selectedOrder: Order;

  ngAfterViewInit(): void {
    this.modal = MaterialService.modalInit(this.modalRef);
  }

  ngOnDestroy(): void {
    this.modal.destroy();
  }

  computeTotal(order: Order): number {
    return order.list.reduce((acc, curr) => {
      return (acc += curr.amount * curr.cost);
    }, 0);
  }

  selectOrder(order: Order): void {
    this.selectedOrder = order;
    this.modal.open();
  }

  closeModal(): void {
    this.modal.close();
  }
}
