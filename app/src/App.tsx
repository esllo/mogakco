import Grant from '@/pages/Grant';
import { Global } from '@emotion/react';
import styled from '@emotion/styled';
import { QueryClient, QueryClientProvider } from 'react-query';
import axios from 'axios';
import { RecoilRoot } from 'recoil';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Style from '@/constants/style';
import Home from '@/pages/Home';

const Main = styled.main`
  background: var(--background-primary);
  height: 100vh;
`;

const baseUrl = 'https://mgc.esllo.com';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 0,
      queryFn: async ({ queryKey: [, url] }) => {
        if (typeof url === 'string') {
          const { data } = await axios.get(`${baseUrl}/api/${url.toLowerCase()}`);
          return data;
        }
        throw new Error('Invalid QueryKey');
      },
    },
  },
});

function App() {
  return (
    <RecoilRoot>
      <QueryClientProvider client={queryClient}>
        <Main>
          <Global styles={Style.rootStyle} />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/grant/" element={<Navigate replace to="/" />} />
              <Route path="/grant/*" element={<Grant />} />
            </Routes>
          </BrowserRouter>
        </Main>
      </QueryClientProvider>
    </RecoilRoot>
  );
}

export default App;
