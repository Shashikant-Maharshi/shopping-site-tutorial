import { useState } from "react";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { UseQueryResult } from "react-query";
import Modal from 'shared/components/Modal/Modal';
import { Cart } from "shared/types/cart";
import ProductView from 'ProductCart/ProductView';
import "./product-cart.scss";

type Props = {
  cart: UseQueryResult<Cart>;
}

const ProductCart = ({
  cart,
}: Props) => {
  const [show, setShow] = useState(false);
  const renderContent = () => {
    if (cart.isLoading) return <i>Fetching users cart...</i>
    else if (cart.isError) return <h3>Failed to load users cart.</h3>
    else {
      return (
        <ul>
          {cart.data?.products.map((product) => (
            <li>
              <ProductView 
                productId={product.id} 
                quantity={product.quantity} 
              />
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
        {cart.isFetching ? 'Loading...' : `Cart Products (${cart.data?.products.length || 0})`}
      </button>
    </div>
  )
}

export default ProductCart;