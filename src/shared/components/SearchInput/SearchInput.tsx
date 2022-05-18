import { ChangeEvent } from "react";
import { HiOutlineSearchCircle } from "react-icons/hi";
import "./search-input.scss";

type Props = {
  search: string;
  onClear: VoidFunction;
  onSearch: (event: ChangeEvent<HTMLInputElement>) => void;
  name: string;
  id: string;
  title?: string;
};

const SearchInput = ({
  search,
  onClear,
  onSearch,
  name,
  id,
  title,
}: Props) => {
  return (
    <div className="search-input">
      <button name="search" type="button">
        <HiOutlineSearchCircle />
      </button>
      <input
        name={name}
        id={id}
        onChange={onSearch}
        value={search}
        title={title || "Enter text"}
        onKeyDown={(event) => {
          if (event.key === 'Escape') {
            onClear();
          }
        }}
      />
    </div>
  )
}

export default SearchInput;