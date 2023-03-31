import React, { useEffect, useState } from 'react';
import { QueryClientProvider } from 'react-query';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Header from './components/Header';
import { queryClient } from './config/queryClient';
import { AuthContext } from './contexts/AuthContext';
import {
  Home,
  Login,
  Register,
  NotFound,
  ConfirmEmail,
  SendConfirmEmailToken,
} from './pages';
import { token } from './utils/singletons';
import 'react-toastify/dist/ReactToastify.css';

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
            <Route path='/confirm-email' element={<ConfirmEmail />} />
            <Route path='/confirm-email/:id' element={<ConfirmEmail />} />
            <Route
              path='/send-confirm-email-token'
              element={<SendConfirmEmailToken />}
            />

            <Route path='*' element={<NotFound />} />
          </Routes>
        </BrowserRouter>
        <ToastContainer />
      </QueryClientProvider>
    </AuthContext.Provider>
  );
};

const HeaderWrapper = () => {
  const location = useLocation();
  const hideHeader = [
    '/login',
    '/register',
    '/confirm-email',
    'send-confirm-email-token',
  ].some((path) => location.pathname.includes(path));

  return hideHeader ? null : <Header />;
};

export default App;
