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

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css'],
})
export class HistoryComponent implements OnInit, AfterViewInit, OnDestroy {
  public isFilter = false;
  @ViewChild('tooltip') tooltipRef: ElementRef;
  tooltip: ModalInterface;
  constructor() {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.tooltip = MaterialService.initTooltip(this.tooltipRef);
  }

  ngOnDestroy(): void {
    this.tooltip.destroy();
  }

  onOpenModal(): void {
    this.isFilter = !this.isFilter;
  }
}
