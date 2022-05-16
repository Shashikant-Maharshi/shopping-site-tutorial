import { 
  memo,
} from 'react';
import Dropdown, {ListItem} from 'shared/components/Dropdown/Dropdown';
import Loader from 'shared/components/Loader/Loader';

type Props = {
  selected?: ListItem;
  onSelect: (userId: string | number) => void;
  isLoading: boolean;
  isError: boolean;
  users?: Record<string | number, ListItem>;
}
const UserList = ({
  selected,
  onSelect,
  isLoading,
  isError,
  users,
}: Props) => {
  const userList: ListItem[] = [
    {
      id: '__default__',
      label: '-- Select User --',
    },
  ];
  
  if (isLoading) return <Loader message='Fetching users' />;
  else if (isError) return <i>No users found</i>;
  else if (users) {
    userList.push(...Object.values(users));
  }

  return (
      <Dropdown
        id="user-selection-control"
        onSelect={(event: any) => onSelect(event.target.value)}
        values={userList}
        selected={selected}
      />
  )
}

export default memo(UserList);
