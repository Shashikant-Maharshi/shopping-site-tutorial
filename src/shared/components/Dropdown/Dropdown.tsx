import React, {ReactEventHandler} from 'react'

import './dropdown.scss';

export type ListItem = {
  id: string | number;
  label: string;
  args?: any;
}
type Props = {
  id: string;
  label?: string;
  onSelect: ReactEventHandler<HTMLSelectElement>;
  values: Array<ListItem>;
  selected?: ListItem;
};

const Dropdown = ({
  id, label, onSelect, values, selected
}: Props) => {
  return (
    <div className='dropdown'>
      {label && (
        <label htmlFor={id}>{label}</label>
      )}
      <select id={id} onChange={onSelect} value={selected?.id}>
        {values.map((value) => (
          <option key={value.id} value={value.id}>
            {value.label}
          </option>
        ))}
      </select>
    </div>
  )
}

export default Dropdown;
