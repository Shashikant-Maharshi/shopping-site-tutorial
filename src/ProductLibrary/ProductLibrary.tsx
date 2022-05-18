import { ChangeEvent } from 'react';
import {User, UserRole} from 'shared/types/user';
import ProductCard from 'ProductCard/ProductCard';
import useProductLibrary from 'ProductLibrary/product-library.hook';
import Loader from 'shared/components/Loader/Loader';
import SearchInput from 'shared/components/SearchInput/SearchInput';
import Paginator, {Paginate} from 'shared/components/Paginator/Paginator';
import {LibraryAction, MAX_PAGES} from 'ProductLibrary/product-library.constants';
import ProductCart from 'ProductCart/ProductCart';
import useCart from 'ProductLibrary/cart.hook';
import "./product-library.scss";

type Props = {
  user: User,
};

const ProductLibrary = ({
  user
}: Props) => {
  const {
    page,
    search,
    productsQuery,
    onAction,
  } = useProductLibrary();
  const cart = useCart(user);

  if (productsQuery.isLoading) return <Loader message='Fetching products' />;
  else if (productsQuery.isError) return <i>No products found</i>;

  return (
    <>
      <ProductCart cart={cart} />
      <div className='filters'>
        <div className='filters__search'>
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
        </div>
        <div className='filters__pagination'>
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
                isAdmin={user?.role === UserRole.Admin}
                onAction={onAction}
              />
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}

export default ProductLibrary;