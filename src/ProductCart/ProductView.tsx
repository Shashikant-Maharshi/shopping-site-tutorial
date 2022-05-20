import {CartProduct} from 'shared/types/cart';

type Props = {
  product: CartProduct;
}

const ProductView = ({
  product
}: Props) => (
  <div className="product-view">
    <h3>{product.name}</h3>
    <code>{`${product.price} x ${product.quantity}`}</code>
    <h4>Total: {product.total}</h4>
  </div>
);

export default ProductView;