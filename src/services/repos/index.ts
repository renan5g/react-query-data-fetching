import { http } from '@services/global/http';
import type { RepoModel } from '@shared/types';
import { useQuery, UseQueryOptions } from 'react-query';
import { createUseReposKey } from './keys';

async function fetchReposByUsername(username: string, page = 1) {
  const { data } = await http.get<RepoModel[]>(`/users/${username}/repos`, {
    params: {
      sort: 'created',
      per_page: 10,
      page,
    },
  });
  return data;
}

export const useRepos = (
  username: string,
  page?: number,
  options?: UseQueryOptions<RepoModel[]>
) => {
  return useQuery(
    createUseReposKey({ username, page }),
    () => fetchReposByUsername(username, page),
    options
  );
};
