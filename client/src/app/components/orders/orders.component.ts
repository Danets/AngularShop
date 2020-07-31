import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  OnDestroy,
} from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { MaterialService } from '../../shared/helpers/material.service';
import { ModalInterface } from '../../shared/helpers/material.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css'],
})
export class OrdersComponent implements OnInit, OnDestroy {
  isRoot: boolean;
  @ViewChild('modal', { static: true }) modalRef: ElementRef;
  modal: ModalInterface;
  subs: Subscription;
  constructor(private router: Router) {}

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
  }

  openModal() {
    this.modal.open();
  }
  closeModal() {
    this.modal.close();
  }
  submitModal() {
    this.modal.close();
  }
}
