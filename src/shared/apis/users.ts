import apiClient from 'shared/apis/utilities/api-client';
import {User} from 'shared/types/user';

export const getUsers = async (): Promise<User[]> => (
  (await apiClient.get("/users")).data
);
