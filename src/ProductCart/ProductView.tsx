import {CartProduct} from 'shared/types/cart';

type Props = {
  product: CartProduct;
  series: number;
}

const ProductView = ({
  product,
  series,
}: Props) => (
  <div className="product-view">
    <h3>{`#${series} ${product.name}`}</h3>
    <div>
      <p>
        <b className='label'>Price: </b> ${product.price}
      </p>
      <p>
        <b className='label'>Quantity: </b> {product.quantity}
      </p> 
      <p>
        <b className='label'>Total: </b> ${product.total}
      </p> 
    </div>
  </div>
);

export default ProductView;