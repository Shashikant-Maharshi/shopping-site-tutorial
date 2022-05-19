import apiClient from 'shared/apis/utilities/api-client';
import {Cart} from 'shared/types/cart';
import { User } from 'shared/types/user';

type UserCart<T> = {
  user: User,
  cart: T,
}
export const getCart = async (userId: number | string): Promise<Cart> => (
  (await apiClient.get(`/carts/${userId}`)).data
);

export const createCart = async (param: UserCart<Partial<Cart>>): Promise<Cart> => (
  (await apiClient.post(`/carts/${param.user.id}`, param.cart)).data
);

export const updateCart = async (param: UserCart<Cart>): Promise<Cart> => (
  (await apiClient.put(`/carts/${param.user.id}`, param.cart)).data
);
