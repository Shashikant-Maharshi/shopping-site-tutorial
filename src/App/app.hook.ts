import {useState, useMemo} from 'react';
import { useQuery } from 'react-query';
import {User} from 'shared/types/user';
import {getUsers} from 'shared/apis/users';
import {ListItem} from 'shared/components/Dropdown/Dropdown';

const useApp = () => {
  const [user, setUser] = useState<ListItem>();
  const usersQuery = useQuery<User[]>(
    'users',
    getUsers
  );
  const {data, isLoading, isError} = usersQuery;
  const usersLookup = useMemo(() => {
    const users: Record<number | string, ListItem> = {};

    if (!isLoading && !isError && data) {
      for (const user of data) {
        users[user.id] = formatUserListItem(user);
      }
    }

    return users;
  }, [data, isLoading, isError]);

  return {
    user,
    setUser,
    usersQuery,
    usersLookup,
  }
};

const formatUserListItem = (user: User): ListItem => ({
  id: user.id,
  label: `${user.name.firstName} ${user.name.lastName}`,
  args: user,
});

export default useApp;
