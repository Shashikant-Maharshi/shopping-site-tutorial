import { useQuery } from 'react-query';
import {User} from 'shared/types/user';
import {Cart} from 'shared/types/cart';
import {getCart} from 'shared/apis/cart';

const useCart = (user: User) => {
  const cartQuery = useQuery<Cart>(
    ['cart', user.id],
    () => getCart(user.id)
  );

  return cartQuery;
}

export default useCart;
