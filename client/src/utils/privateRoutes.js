import React, { useEffect } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { useAuth } from '../AuthContext';

const PrivateRoutes = () => {
  const { isLoggedIn, login } = useAuth();

  useEffect(() => {
    // Retrieve the token from the cookie
    const token = Cookies.get('auth_token');

    // Check if the token exists and the user is not already logged in
    if (token && !isLoggedIn) {
      // Call the login function to update the global login state
      login();
    }
  }, [isLoggedIn, login]);

  return isLoggedIn ? <Outlet /> : <Navigate to="/" />;
};

export default PrivateRoutes;
