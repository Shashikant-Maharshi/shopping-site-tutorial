import {baseUrl} from 'shared/apis/constants/api';
import {User} from 'shared/types/user';

export const getUsers = async (): Promise<User[]> => (
  await (await fetch(`${baseUrl}/users`)).json()
);
