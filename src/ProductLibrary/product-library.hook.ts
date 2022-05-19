import {useCallback, useEffect, useState} from 'react';
import { useQuery, useQueryClient, useMutation } from 'react-query';
import { toast } from 'react-toastify';
import {LibraryAction, PRODUCT_DISPLAY_LIMIT} from 'ProductLibrary/product-library.constants';
import {Product} from 'shared/types/product';
import {
  getProducts, createProduct, 
  updateProduct, deleteProduct
} from 'shared/apis/products';
import useDebounce from 'shared/hooks/debounce';

const productOperationMessages = {
  [LibraryAction.CreateProduct]: {
    success: 'Product created successfully.',
    error: 'Failed to create product',
  },
  [LibraryAction.EditProduct]: {
    success: 'Product updated successfully.',
    error: 'Failed to update product',
  },
  [LibraryAction.DeleteProduct]: {
    success: 'Product deleted successfully.',
    error: 'Failed to delete product',
  }
}

const useProductLibrary = () => {
  const [search, setSearch] = useState<string>('');
  const debouncedValue = useDebounce<string>(search, 500);
  const [page, setPage] = useState<number>(1);
  const [selectedProductAction, setSelectedProductAction] = useState<LibraryAction>();
  const [selectedProduct, setSelectedProduct] = useState<Product | undefined>(undefined);
  const queryClient = useQueryClient();
  const resetOpretationsState = () => {
    setSelectedProductAction(undefined);
    setSelectedProduct(undefined);
    queryClient.invalidateQueries();
  };
  const mutationResetOptions = (messages: any) => ({
    onSuccess: () => {
      toast.success(messages.success);
      resetOpretationsState();
    },
    onError: () => {
      toast.error(messages.error);
      resetOpretationsState();
    },
  });
  const productsQuery = useQuery<Product[]>(
    ['products', page, PRODUCT_DISPLAY_LIMIT],
    () => getProducts([
      ['_page', page],
      ['_limit', PRODUCT_DISPLAY_LIMIT],
      ['q', debouncedValue]
    ]), 
    { keepPreviousData : true }
  );
  const { 
    isLoading: isCreatingProduct, 
    mutate: createProductMutation
  } = useMutation(
    createProduct, 
    mutationResetOptions(productOperationMessages[LibraryAction.CreateProduct])
  );
  const { 
    isLoading: isUpdatingProduct, 
    mutate: updateProductMutation
  } = useMutation(
    updateProduct, 
    mutationResetOptions(productOperationMessages[LibraryAction.EditProduct])
  );
  const { 
    mutate: deleteProductMutation 
  } = useMutation(
    deleteProduct, 
    mutationResetOptions(productOperationMessages[LibraryAction.DeleteProduct])
  );
  const { refetch } = productsQuery;
  const onAction = useCallback((type: LibraryAction, payload: any) => {
    const handlers: Record<LibraryAction, Function> = {
      [LibraryAction.UpdatePage]: () => {
        setPage(payload);
      },
      [LibraryAction.UpdateSearch]: () => {
        setSearch(payload);
      },
      [LibraryAction.CreateProduct]: () => {
        setSelectedProductAction(LibraryAction.CreateProduct);
        setSelectedProduct(payload);
      },
      [LibraryAction.EditProduct]: () => {
        setSelectedProductAction(LibraryAction.EditProduct);
        setSelectedProduct(payload);
      },
      [LibraryAction.DeleteProduct]: () => {
        const response = window.confirm("Are you sure you want to delete this product");
          
        if (response === true) {
          deleteProductMutation(payload);
        }
      },
      [LibraryAction.SelectProduct]: () => {
        setSelectedProduct(payload);
      },
      [LibraryAction.MutateProduct]: async () => {
        if (selectedProductAction === LibraryAction.CreateProduct) {
          createProductMutation(payload);
        } else if (selectedProductAction === LibraryAction.EditProduct) {
          updateProductMutation(payload);
        }
      },
      [LibraryAction.AddToCart]: () => {
        // by passed to useCart hook
      },
    };

    const runner = handlers[type] || (() => {});
    runner();
  }, [
    createProductMutation, deleteProductMutation, 
    selectedProductAction, updateProductMutation,
  ]);

  useEffect(() => {
    refetch();
  }, [refetch, debouncedValue]);

  return {
    page,
    search,
    selectedProduct,
    selectedProductAction,
    productsQuery,
    onAction,
    processingForm: (
      isCreatingProduct 
      || isUpdatingProduct
    ),
  };
};

export default useProductLibrary;
