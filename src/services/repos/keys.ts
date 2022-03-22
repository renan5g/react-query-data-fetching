import { QueryKey } from 'react-query';

export const createUseReposKey = ({
  username,
  page = 1,
}: {
  username: string;
  page?: number;
}): QueryKey => ['repos', { username, page }];
