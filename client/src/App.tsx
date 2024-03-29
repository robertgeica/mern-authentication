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
  SendResetPasswordToken,
  ResetPassword,
  User,
} from './pages';
import { token } from './utils/singletons';
import 'react-toastify/dist/ReactToastify.css';
import setAuthTokenHeader from './utils/setAuthTokenHeader';
import { UserContext } from './contexts/UserContext';

if (token) setAuthTokenHeader(token);

const App: React.FC = () => {
  const [authToken, setAuthToken] = useState<string | null>(token || null);
  const [user, setUser] = useState<null>(null);

  useEffect(() => {
    if (authToken) {
      localStorage.setItem('auth-token', authToken);
    } else {
      localStorage.removeItem('auth-token');
    }
  }, [authToken]);

  return (
    <AuthContext.Provider value={{ authToken, setAuthToken }}>
      <UserContext.Provider value={{ user, setUser }}>
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
                path='/request-confirm-email'
                element={<SendConfirmEmailToken />}
              />
              <Route path='/reset-password' element={<ResetPassword />} />
              <Route path='/reset-password/:id' element={<ResetPassword />} />
              <Route
                path='/forgot-password'
                element={<SendResetPasswordToken />}
              />
              <Route path='/user' element={<User />}  />

              <Route path='*' element={<NotFound />} />
            </Routes>
          </BrowserRouter>
          <ToastContainer />
        </QueryClientProvider>
      </UserContext.Provider>
    </AuthContext.Provider>
  );
};

const HeaderWrapper = () => {
  const location = useLocation();
  const hideHeader = [
    '/login',
    '/register',
    '/confirm-email',
    '/request-confirm-email',
    '/forgot-password',
    '/reset-password',
  ].some((path) => location.pathname.includes(path));

  return hideHeader ? null : <Header />;
};

export default App;
