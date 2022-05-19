import { useQuery, useMutation } from 'react-query';
import {User} from 'shared/types/user';
import {Cart} from 'shared/types/cart';
import {Product} from 'shared/types/product';
import {getCart, createCart, updateCart} from 'shared/apis/cart';

const useCart = (user: User) => {
  const cartQuery = useQuery<Cart>(
    ['cart', user.id],
    () => getCart(user.id)
  );
  const { 
    isLoading: isCreatingCart, 
    mutate: createCartMutation
  } = useMutation(createCart);
  const { 
    isLoading: isUpdatingCart, 
    mutate: updateCartMutation
  } = useMutation(updateCart);
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
    cartQuery,
    handleUpdateCart,
    processingCart: isCreatingCart || isUpdatingCart,
  };
}

export default useCart;
