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
