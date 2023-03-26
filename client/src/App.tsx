import React, { useEffect, useState } from 'react';
import { QueryClientProvider } from 'react-query';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import Header from './components/Header';
import { queryClient } from './config/queryClient';
import { AuthContext } from './contexts/AuthContext';
import { Home, Login, Register, NotFound } from './pages';
import { token } from './utils/singletons';

const App: React.FC = () => {
  const [authToken, setAuthToken] = useState<string | null>(token || null);

  useEffect(() => {
    if (authToken) {
      localStorage.setItem('auth-token', authToken);
    } else {
      localStorage.removeItem('auth-token');
    }
  }, [authToken]);

  return (
    <AuthContext.Provider value={{ authToken, setAuthToken }}>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <HeaderWrapper />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />

            <Route path='*' element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </QueryClientProvider>
    </AuthContext.Provider>
  );
};

const HeaderWrapper = () => {
  const location = useLocation();
  const hideHeader = ['/login', '/register'].includes(location.pathname);
  return hideHeader ? null : <Header />;
};

export default App;
