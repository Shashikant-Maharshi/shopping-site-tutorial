import { useQuery } from "react-query";
import {Product} from 'shared/types/product';
import {getProduct} from 'shared/apis/products';

type Props = {
  productId: string | number;
  quantity: number;
}

const ProductView = ({
  productId,
  quantity,
}: Props) => {
  const {isLoading, isError, data} = useQuery<Product>(
    ['products', productId],
    () => getProduct(productId)
  );
  
  if (isLoading) return <i>Loading product...</i>;
  else if (isError) return <h3>Failed to load this product</h3>
  
  return data ? (
    <div className="product-view">
      <h3>{data.name}</h3>
      <code>{`${data.price} x ${quantity}`}</code>
      <h4>Total: {Math.floor(data.price * quantity)}</h4>
    </div>
  ) : null
}

export default ProductView;