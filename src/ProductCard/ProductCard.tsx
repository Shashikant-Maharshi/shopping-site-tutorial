import {Product} from 'shared/types/product';
import {LibraryAction} from 'ProductLibrary/product-library.constants';
import "./product-card.scss";

type Props = {
  product: Product;
  isAdmin: boolean;
  onAction: (type: LibraryAction, payload: any) => void;
};

const ProductCard = ({
  product,
  isAdmin,
  onAction,
}: Props) => {
  return (
    <div className="product-card">
      <div className="product-card__image">
        <img src={product.defaultImage} alt={`Product - ${product.name}`} />
      </div>
      <div className="product-card__content">
        <h2 className="product-card__title" title={product.name}>{product.name}</h2>
        <p className="product-card__text" title={product.description}>{product.description}</p>
        <p className="product-card__prices">
          <del>{`$${product.discount}`}</del>
          <ins>{`$${product.price}`}</ins>
        </p>
        {isAdmin ? (
          <>
            <button 
              className="btn product-card__btn"
              onClick={() => onAction(LibraryAction.EditProduct, product)}
            >
              Edit
            </button>
            <button 
              className="btn product-card__btn"
              onClick={() => onAction(LibraryAction.DeleteProduct, product)}
            >
              Delete
            </button>
          </>  
        ) : (
          <button 
            className="btn product-card__btn"
            onClick={() => onAction(LibraryAction.AddToCart, product)}
          >
            Add to Cart
          </button>
        )}
      </div>
    </div>
  )
}

export default ProductCard;
