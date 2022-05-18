import {baseUrl} from 'shared/apis/constants/api';
import {Product} from 'shared/types/product';
import {QueryParams, formatQueryParams} from 'shared/apis/utilities/query-params';

export const getProducts = async (queryParams: QueryParams): Promise<Product[]> => {
  let query = '';

  if (queryParams.length) {
    query = `?${formatQueryParams(queryParams)}`;
  }
  
  return await (await fetch(`${baseUrl}/products${query}`)).json()
};

export const getProduct = async (productId: number | string): Promise<Product> => (
  await (await fetch(`${baseUrl}/products/${productId}`)).json()
);

export const deleteProduct = async (productId: string | number) => (
  await ( await fetch(`${baseUrl}/products/${productId}`, { method: 'DELETE' })).json()
);
