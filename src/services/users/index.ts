import { http } from '@services/global/http';
import type { UserModel } from '@shared/types';
import { useQuery, UseQueryOptions } from 'react-query';
import { createUseUserKey } from './keys';

async function fetchUserByUsername(username: string) {
  const { data } = await http.get<UserModel>(`/users/${username}`);
  return data;
}

export const useUser = (
  username: string,
  options?: UseQueryOptions<UserModel>
) => {
  return useQuery(
    createUseUserKey(username),
    () => fetchUserByUsername(username),
    options
  );
};
