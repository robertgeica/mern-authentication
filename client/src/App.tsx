import React from 'react';
import { QueryCache, QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';

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
      <Header />
        <Routes>
          <Route path='/' element={<Home />} />
          {/* <Route path='/login' element={<Login />} /> */}
          {/* <Route path='/register' element={<Register />} /> */}
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
};

export default App;
