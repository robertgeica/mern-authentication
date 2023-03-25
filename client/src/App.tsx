import React from 'react';
import { QueryCache, QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import Header from './components/Header';
import { Home, Login } from './pages';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
    },
  },
  queryCache: new QueryCache({
    onError: (error: any, query: any) => {
      if (query.state.status === 'error') {
        console.log(`Error: ${error.message}`);
      }
    },
  }),
});

const App: React.FC = () => {

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
      <HeaderWrapper />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          {/* <Route path='/register' element={<Register />} /> */}
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
};

const HeaderWrapper = () => {
  const location = useLocation();
  const hideHeader = ['/login', '/register'].includes(location.pathname);
  return hideHeader ? null : <Header />;
}

export default App;
