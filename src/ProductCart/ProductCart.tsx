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
      let sumTotal = 0;
      const productViews = [];

      for (const [productIndex, product] of Object.entries(cart.products)) {
        sumTotal += product.total;
        productViews.push((
          <li key={product.id} className="product">
            <ProductView series={Number(productIndex) + 1} product={product} />
          </li>
        ));
      }
      return (
        <ul className="products">
          {productViews}
          <li>
            <h3>
              Sum Total: ${Math.floor(sumTotal)}
            </h3>
          </li>
        </ul>
      );
    }
  };

  return (
    <div className="product-cart">
      <Modal
        className="shopping-cart-modal"
        show={show}
        onClose={() => setShow(false)}
      >
        <Modal.Header title={`Shopping Cart (${cart.products.length} products)`} />
        <Modal.Content>
          {renderContent()}
        </Modal.Content>
        <Modal.Footer>
          <button 
            className="secondary-button"
            name="checkout"
            title="Checkout"
            onClick={() => {
              setShow(false);
              setTimeout(() => {
                alert('Payment successful. Thanks for buying from our store.');
              }, 500);
            }}
          >
            Checkout
          </button>
        </Modal.Footer>
      </Modal>
      <button 
        name="show-cart"
        title="Show cart"
        className="secondary-button" 
        onClick={() => setShow(!show)}
      >
        <AiOutlineShoppingCart />{" "}
        {isFetching ? 'Loading...' : `Cart Products (${cart.products.length || 0})`}
      </button>
    </div>
  )
}

export default ProductCart;