export interface Order {
  date?: Date;
  order?: number;
  user?: string;
  _id?: string;
  list: OrderPosition[];
}

export interface OrderPosition {
  name: string;
  cost: number;
  amount: number;
  _id?: string;
}
