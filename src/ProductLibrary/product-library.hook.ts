import {useCallback, useEffect, useState} from 'react';
import { useQuery } from 'react-query';
import {LibraryAction, PRODUCT_DISPLAY_LIMIT} from 'ProductLibrary/product-library.constants';
import {Product} from 'shared/types/product';
import {getProducts} from 'shared/apis/products';
import useDebounce from 'shared/hooks/debounce';

const useProductLibrary = () => {
  const [search, setSearch] = useState<string>('');
  const debouncedValue = useDebounce<string>(search, 500);
  const [page, setPage] = useState<number>(1);
  const productsQuery = useQuery<Product[]>(
    ['products', page, PRODUCT_DISPLAY_LIMIT],
    () => getProducts([
      ['_page', page],
      ['_limit', PRODUCT_DISPLAY_LIMIT],
      ['q', debouncedValue]
    ]), 
    { keepPreviousData : true }
  );
  const { refetch } = productsQuery;
  const onAction = useCallback((type: LibraryAction, payload: any) => {
    const handlers = {
      [LibraryAction.UpdatePage]: () => {
        setPage(payload);
      },
      [LibraryAction.UpdateSearch]: () => {
        setSearch(payload);
      },
      [LibraryAction.AddToCart]: () => {
        console.log('add-to-cart');
      },
      [LibraryAction.EditProduct]: () => {
        console.log('edit');
      },
      [LibraryAction.DeleteProduct]: () => {
        console.log('delete');
      },
    };

    const runner = handlers[type] || (() => {});
    runner();
  }, []);

  useEffect(() => {
    refetch();
  }, [refetch, debouncedValue]);

  return {
    page,
    search,
    productsQuery,
    onAction,
  };
};

export default useProductLibrary;
