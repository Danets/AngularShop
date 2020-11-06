export interface Overview {
  profit: OverviewItem;
  orders: OverviewItem;
}

export interface OverviewItem {
  percent: number;
  compare: number;
  last: number;
  isHigher: boolean;
}

export interface Analytics {
  averageOrder: number;
  chart: analyticsChartItem[];
}

export interface analyticsChartItem {
  label: string;
  income: number;
  amountOrders: number;
}
