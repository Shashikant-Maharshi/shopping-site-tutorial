import { useState } from "react";
import { AiOutlineShoppingCart } from "react-icons/ai";
import Modal from 'shared/components/Modal/Modal';
import { ClientCart } from "shared/types/cart";
import ProductView from 'ProductCart/ProductView';
import "./product-cart.scss";

type Props = {
  cart: ClientCart;
  isError: boolean;
  isLoading: boolean;
  isFetching: boolean;
}

const ProductCart = ({
  isLoading,
  isError,
  isFetching,
  cart,
}: Props) => {
  const [show, setShow] = useState(false);
  const renderContent = () => {
    if (isLoading) return <i>Fetching users cart...</i>
    else if (isError) return <h3>Failed to load users cart.</h3>
    else {
      return (
        <ul>
          {cart.products.map((product) => (
            <li key={product.id}>
              <ProductView product={product} />
            </li>
          ))}
        </ul>
      );
    }
  };

  return (
    <div className="product-cart">
      <Modal
        show={show}
        onClose={() => setShow(false)}
      >
        <Modal.Header title="Shopping Cart" />
        <Modal.Content>
          {renderContent()}
        </Modal.Content>
        <Modal.Footer>
          <button onClick={() => {
            setShow(false);
            setTimeout(() => {
              alert('Payment successful. Thanks for buying from our store.');
            }, 500);
          }}>
            Checkout
          </button>
        </Modal.Footer>
      </Modal>
      <button className="product-cart__button" onClick={() => setShow(!show)}>
        <AiOutlineShoppingCart />{" "}
        {isFetching ? 'Loading...' : `Cart Products (${cart.products.length || 0})`}
      </button>
    </div>
  )
}

export default ProductCart;