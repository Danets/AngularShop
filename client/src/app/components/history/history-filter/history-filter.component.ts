import {
  Component,
  EventEmitter,
  Output,
  ViewChild,
  ElementRef,
  AfterViewInit,
  OnDestroy,
} from '@angular/core';
import { Filter } from './../../../shared/models/order';
import {
  DatePickerInterface,
  MaterialService,
} from './../../../shared/helpers/material.service';

@Component({
  selector: 'app-history-filter',
  templateUrl: './history-filter.component.html',
  styleUrls: ['./history-filter.component.css'],
})
export class HistoryFilterComponent implements AfterViewInit, OnDestroy {
  @Output() emitedFilter = new EventEmitter<Filter>();
  @ViewChild('start') startRef: ElementRef;
  @ViewChild('end') endRef: ElementRef;
  start: DatePickerInterface;
  end: DatePickerInterface;
  order: number;
  isValid = true;

  ngAfterViewInit(): void {
    this.start = MaterialService.initDatePicker(
      this.startRef,
      this.validateDate.bind(this)
    );
    this.end = MaterialService.initDatePicker(
      this.endRef,
      this.validateDate.bind(this)
    );
  }

  ngOnDestroy(): void {
    this.start.destroy();
    this.end.destroy();
  }

  validateDate(): void {
    if (!this.start.date || !this.end.date) {
      this.isValid = false;
      return;
    }
    this.isValid = this.start.date < this.end.date;
  }

  chooseFilter(): void {
    const filter: Filter = {};

    if (this.order) {
      filter.order = this.order;
    }

    if (this.start.date) {
      filter.start = this.start.date;
    }

    if (this.end.date) {
      filter.end = this.end.date;
    }
    this.emitedFilter.emit(filter);
  }
}
