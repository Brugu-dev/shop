import { ProductItem } from './productItem';
export interface OrderItem {
	quantity: number;
	totalPrice: number;
	product: ProductItem;
}
