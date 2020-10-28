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
