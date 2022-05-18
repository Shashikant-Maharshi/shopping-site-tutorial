import {baseUrl} from 'shared/apis/constants/api';
import {Cart} from 'shared/types/cart';

export const getCart = async (userId: number | string): Promise<Cart> => (
  await (await fetch(`${baseUrl}/carts/${userId}`)).json()
);
