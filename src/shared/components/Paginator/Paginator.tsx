import { ChangeEvent } from "react";
import {
  AiFillFastBackward,
  AiFillStepBackward,
  AiFillStepForward,
  AiFillFastForward,
} from "react-icons/ai";
import {MAX_PAGES} from 'ProductLibrary/product-library.constants';
import "./paginator.scss";

export enum Paginate {
  First,
  Backward,
  Forward,
  Last,
}

type Props = {
  page: number;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onClick: (paginate: Paginate) => void;
};

const Paginator = ({
  page,
  onChange,
  onClick,
}: Props) => {
  const isFirst = page === 1;
  const isLast = page === MAX_PAGES; // 1000 products / 10 product limit

  return (
    <nav aria-label="Page navigation">
      <ul className="pagination">
        <li 
          className="pagination__item" 
          onClick={() => !isFirst && onClick(Paginate.First)}
        >
          <AiFillFastBackward />
        </li>
        <li 
          className="pagination__item" 
          onClick={() => !isFirst && onClick(Paginate.Backward)}
        >
          <AiFillStepBackward />
        </li>
        <li className="pagination__item">
          <input 
            name="page-number" 
            onChange={onChange} 
            value={page}
            type="number"
            min="1"
            max={MAX_PAGES}
          />
        </li>
        <li 
          className="pagination__item" 
          onClick={() => !isLast && onClick(Paginate.Forward)}
        >
          <AiFillStepForward />
        </li>
        <li 
          className="pagination__item" 
          onClick={() => !isLast && onClick(Paginate.Last)}
        >
          <AiFillFastForward />
        </li>
      </ul>
    </nav>
  )
}

export default Paginator;