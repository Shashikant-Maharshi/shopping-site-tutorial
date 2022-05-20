import { Product } from './product';

export type CartProduct = Product & {
  quantity: number;
  total: number;
}

export type ClientCart = {
  id: number; // User id
  products: CartProduct[];
};

export type Cart = {
  id: number; // User id
  products: {
    id: number;
    quantity: number;
  }[];
};
