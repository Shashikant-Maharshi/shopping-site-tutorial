import apiClient from 'shared/apis/utilities/api-client';
import {Cart} from 'shared/types/cart';

export const getCart = async (userId: number | string): Promise<Cart> => (
  (await apiClient.get(`/carts/${userId}`)).data
);
