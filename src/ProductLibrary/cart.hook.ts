import {useMemo} from 'react';
import { 
  useQuery, 
  useQueries,
  useQueryClient, 
  useMutation 
} from 'react-query';
import { toast } from 'react-toastify';
import {User} from 'shared/types/user';
import {Cart, CartProduct} from 'shared/types/cart';
import {Product} from 'shared/types/product';
import {getCart, createCart, updateCart} from 'shared/apis/cart';
import { getProduct } from 'shared/apis/products';

enum CartOperations {
  Create,
  Update,
}

const cartOperationMessages = {
  [CartOperations.Create]: {
    success: 'Cart created successfully.',
    error: 'Failed to create cart',
  },
  [CartOperations.Update]: {
    success: 'Cart updated successfully.',
    error: 'Failed to update cart',
  },
};

const useCart = (user: User) => {
  const queryClient = useQueryClient();
  const cartQuery = useQuery<Cart>(
    ['cart', user.id],
    () => getCart(user.id)
  );
  const { isLoading, isError, isFetching, data: cartData } = cartQuery
  const products = useMemo(() => cartData?.products || [], [cartData?.products]);

  const productsQuery = useQueries(
    products.map(product => {
      return {
        queryKey: ['product', product.id],
        queryFn: () => getProduct(product.id),
      }
    })
  );

  const isProductsLoading = productsQuery.some((productQuery) => productQuery.isLoading);

  const cart: any = useMemo(() => {
    const formattedCartProducts: CartProduct[] = [];

    if (!isProductsLoading && products.length) {
      for (const [productIndex, productQuery] of Object.entries(productsQuery)) {
        if (productQuery.data) {
          const { quantity } = products[productIndex as any];
          formattedCartProducts[productIndex as any] = {
            ...productQuery.data,
            quantity,
            total: Math.floor(productQuery.data.price * quantity),
          };
        }
      }
    }

    return {
      id: cartData?.id,
      products: formattedCartProducts,
    };
  }, [cartData?.id, isProductsLoading, products, productsQuery]);

  const mutationResetOptions = (messages: any) => ({
    onSuccess: () => {
      toast.success(messages.success);
      queryClient.invalidateQueries();
    },
    onError: () => {
      toast.error(messages.error);
      queryClient.invalidateQueries();
    },
  }); 

  const { mutate: createCartMutation } = useMutation(
    createCart,
    mutationResetOptions(cartOperationMessages[CartOperations.Create])
  );

  const { mutate: updateCartMutation } = useMutation(
    updateCart, 
    mutationResetOptions(cartOperationMessages[CartOperations.Update])
  );

  const handleUpdateCart = (newProduct: Product) => {
    const { data } = cartQuery;
    const cartProductIndex = data?.products.findIndex((product) => product.id === newProduct.id);
    const products = data?.products || [];
    const newCartProduct = {
      id: newProduct.id!,
      quantity: 1,
    }

    if (data) {
      if (cartProductIndex !== -1) {
        newCartProduct.quantity = products[cartProductIndex!].quantity + 1;
        products[cartProductIndex!] = newCartProduct;
      } else {
        products.push(newCartProduct);
      }

      updateCartMutation({
        user, 
        cart: {
          id: data.id,
          products,
        }
      });
    } else {
      createCartMutation({
        user,
        cart: {
          products: [...products, newCartProduct],
        }
      });
    }
  };
  
  return {
    isLoading,
    isError,
    isFetching,
    cart,
    handleUpdateCart,
  };
} 

export default useCart;
