import { ChakraProvider } from '@chakra-ui/react';
import { client } from '@config/query-client';
import { myTheme } from '@config/theme';
import { Home } from '@pages/Home';
import { QueryClientProvider } from 'react-query';
import './styles/index.css';

export function App() {
  return (
    <QueryClientProvider client={client}>
      <ChakraProvider theme={myTheme}>
        <Home />
      </ChakraProvider>
    </QueryClientProvider>
  );
}
