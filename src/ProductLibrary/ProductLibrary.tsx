import { ChangeEvent } from 'react';
import {User, UserRole} from 'shared/types/user';
import ProductCard from 'ProductCard/ProductCard';
import useProductLibrary from 'ProductLibrary/product-library.hook';
import Loader from 'shared/components/Loader/Loader';
import SearchInput from 'shared/components/SearchInput/SearchInput';
import Paginator, {Paginate} from 'shared/components/Paginator/Paginator';
import {LibraryAction, MAX_PAGES} from 'ProductLibrary/product-library.constants';
import ProductCart from 'ProductCart/ProductCart';
import ProductForm from 'ProductForm/ProductForm';
import {Product} from 'shared/types/product';
import useCart from 'ProductLibrary/cart.hook';
import "./product-library.scss";

const defaultProduct: Product = {
  name: '',
  description: '',
  price: 0,
  discount: 0,
  defaultImage: "http://placeimg.com/640/480/cats",
  images: Array(4).fill("http://placeimg.com/640/480/cats")
};

type Props = {
  user: User,
};

const ProductLibrary = ({
  user
}: Props) => {
  const {
    page,
    search,
    selectedProduct,
    selectedProductAction,
    productsQuery,
    onAction,
    processingForm,
  } = useProductLibrary();
  const {
    cartQuery,
    handleUpdateCart,
  } = useCart(user);
  const isAdmin = user?.role === UserRole.Admin;

  if (productsQuery.isLoading) return <Loader message='Fetching products' />;
  else if (productsQuery.isError) return <i>No products found</i>;

  return (
    <>
      <ProductCart cart={cartQuery} />
      {selectedProduct && selectedProductAction !== LibraryAction.DeleteProduct && (
        <ProductForm 
          product={selectedProduct}
          onSubmit={(product: Product) => onAction(LibraryAction.MutateProduct, product)}
          onClose={() => onAction(LibraryAction.SelectProduct, undefined)}
          processingForm={processingForm}
        />
      )}
      <div className='tools'>
        <div className='tools__search'>
          <SearchInput
            search={search || ''}
            onClear={() => onAction(LibraryAction.UpdateSearch, '')}
            onSearch={(event: ChangeEvent<HTMLInputElement>) => {
              onAction(LibraryAction.UpdateSearch, event.target.value);
            }}
            name="search-product"
            id="filterByProductTitle"
            title="Filter products by their title"
          />
          {isAdmin && (
            <button 
              name="create-new-product" 
              className='tools__button'
              onClick={() => onAction(LibraryAction.CreateProduct, defaultProduct)}
            >
              Create New Product
            </button>
          )}
        </div>
        <div className='tools__pagination'>
          <Paginator
            page={page}
            onChange={(event) => {
              const pageNumber = Number(event.target.value);

              if (pageNumber >= 1 && pageNumber <= MAX_PAGES) {
                onAction(LibraryAction.UpdatePage, pageNumber);
              }
            }}
            onClick={(paginate) => {
              if (paginate === Paginate.First) onAction(LibraryAction.UpdatePage, 1);
              else if (paginate === Paginate.Last) onAction(LibraryAction.UpdatePage, MAX_PAGES);
              else if (paginate === Paginate.Forward) onAction(LibraryAction.UpdatePage, page + 1);
              else if (paginate === Paginate.Backward) onAction(LibraryAction.UpdatePage, page - 1);
            }}
          />
        </div>
      </div>
      <div className='flex-fluid'>
        <ul className='grid'>
          {productsQuery.data?.map((product) => (
            <li className="grid__item" key={product.id}>
              <ProductCard 
                product={product}
                isAdmin={isAdmin}
                onAction={(action: LibraryAction, ...args) => {
                  if (action === LibraryAction.AddToCart) {
                    handleUpdateCart(...args);
                  } else {
                    onAction(action, ...args);
                  }
                }}
              />
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}

export default ProductLibrary;