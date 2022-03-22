import { Badge, Button, Flex, Image, Link, Text } from '@chakra-ui/react';
import { useRepos } from '@services/repos';
import { useUser } from '@services/users';
import { useState } from 'react';

const USERNAME = 'renan5g';

export function Home() {
  const [page, setPage] = useState(1);

  const { data: user } = useUser(USERNAME);
  const { data: repos, isFetching } = useRepos(USERNAME, page, {
    keepPreviousData: true,
  });

  const lastPage = Math.ceil(Number(user?.public_repos) / 10);

  return (
    <Flex
      direction="column"
      alignItems="center"
      paddingTop="12px"
      paddingBottom="32px"
    >
      <Image
        src={user?.avatar_url}
        alt="User Avatar"
        width="96px"
        height="96px"
        borderRadius="full"
      />
      <Text fontWeight="bold" fontSize="24px" marginTop="32px">
        {user?.name}
      </Text>
      <Text fontWeight="500" marginTop="8px">
        {user?.bio}
      </Text>
      <Text fontWeight="bold" fontSize="24px" marginTop="40px">
        Repos
      </Text>
      {repos?.map((repo) => (
        <Link
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          width="400px"
          height="48px"
          backgroundColor="#0E0326"
          marginTop="16px"
          paddingLeft="16px"
          paddingRight="16px"
          href={repo.html_url}
          target="_blank"
          _focus={{ boxShadow: 'none' }}
          _hover={{ textDecoration: 'none' }}
        >
          <Text>{repo.name}</Text>
          <Badge colorScheme="green">{repo.language}</Badge>
        </Link>
      ))}

      {isFetching ? <span> Loading...</span> : null}

      <Flex marginTop="32px" alignItems="center" gap="16px">
        <Button
          onClick={() => setPage((old) => Math.max(old - 1, 1))}
          disabled={page === 1}
        >
          Previous Page
        </Button>
        <Button
          onClick={() => setPage((old) => old + 1)}
          disabled={page >= lastPage}
        >
          Next Page
        </Button>
      </Flex>
    </Flex>
  );
}
