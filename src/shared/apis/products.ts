import apiClient from 'shared/apis/utilities/api-client';
import {Product} from 'shared/types/product';
import {QueryParams, formatQueryParams} from 'shared/apis/utilities/query-params';

export const getProducts = async (queryParams: QueryParams): Promise<Product[]> => {
  let query = '';

  if (queryParams.length) {
    query = `?${formatQueryParams(queryParams)}`;
  }
  
  return (await apiClient.get(`/products${query}`)).data;
};

export const getProduct = async (productId: number | string): Promise<Product> => (
  (await apiClient.get(`/products/${productId}`)).data
);

export const createProduct = async (product: Product) => (
  (await apiClient.post("/products", product)).data
);

export const updateProduct = async (product: Product) => (
  (await apiClient.put(`/products/${product.id}`, product)).data
);

export const deleteProduct = async (product: Product) => (
  (await apiClient.delete(`/products/${product.id}`)).data
);
