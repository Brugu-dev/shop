import { Shipping } from './shipping';
import { OrderItem } from './orderItem';

export class Order {
	orderItems: OrderItem[];
	datePlaced: number;
  userId: string;
  shipping: Shipping;
	id: string;
	totalPrice: number;

	constructor() {

	}
}
