import {
  Component,
  ViewChild,
  ElementRef,
  AfterViewInit,
  OnDestroy,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { AnalyticsService } from './../../shared/services/analytics.service';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-analytics',
  templateUrl: './analytics.component.html',
  styleUrls: ['./analytics.component.css'],
})
export class AnalyticsComponent implements AfterViewInit, OnDestroy {
  @ViewChild('income') incomeRef: ElementRef;
  @ViewChild('orders') ordersRef: ElementRef;
  averageCheck: number;
  public pending = true;
  private subs = new Subscription();

  constructor(private analyticsService: AnalyticsService) {}

  ngAfterViewInit(): void {
    const incomeConfig: any = {
      label: 'Income',
      color: 'rgba(255, 99, 132, 0.2)',
    };

    const ordersConfig: any = {
      label: 'Orders',
      color: 'rgba(54, 162, 235, 0.2)',
    };

    this.subs.add(
      this.analyticsService
        .getAnalytics()
        .subscribe(({ averageOrder, chart }) => {
          this.averageCheck = averageOrder;

          incomeConfig.labels = chart.map((item) => item.label);
          incomeConfig.data = chart.map((item) => item.income);

          ordersConfig.labels = chart.map((item) => item.label);
          ordersConfig.data = chart.map((item) => item.amountOrders);
          // SETTING CONTEXT FOR GRAPHS
          const incomeCtx = this.incomeRef.nativeElement.getContext('2d');
          const ordersCtx = this.ordersRef.nativeElement.getContext('2d');

          incomeCtx.canvas.height = '300px';
          ordersCtx.canvas.height = '300px';

          new Chart(incomeCtx, createChartConfig(incomeConfig));
          new Chart(ordersCtx, createChartConfig(ordersConfig));

          this.pending = false;
        })
    );
  }

  ngOnDestroy(): void {
    if (this.subs) {
      this.subs.unsubscribe();
    }
  }
}

function createChartConfig({ labels, data, label, color }) {
  return {
    type: 'line',
    options: {
      responsive: true,
    },
    data: {
      labels,
      datasets: [
        {
          label,
          data,
          borderColor: color,
          steppedLine: false,
          fill: false,
        },
      ],
    },
  };
}
