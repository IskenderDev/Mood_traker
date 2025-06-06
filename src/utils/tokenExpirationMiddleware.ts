import { Middleware } from '@reduxjs/toolkit';
import { signout } from '../redux/auth/features';
import { isTokenExpired } from './helpers';
import { toast } from 'sonner';

const tokenExpirationMiddleware: Middleware = (store) => {
  let isDispatching = false;
  const toastId = 'ware';

  return (next) => (action) => {
    if (!isDispatching) {
      const token = localStorage.getItem('token');

      if (token && isTokenExpired(token)) {
        isDispatching = true;
        store.dispatch(signout());
        isDispatching = false;
        toast.error('Your session timed out. Please log in to continue.', {
          id: toastId,
        });

        if (window.location.href !== '/auth/signin') {
          window.location.href !== '/auth/signin';
        }
        return;
      }
    }
    return next(action);
  };
};

export default tokenExpirationMiddleware;
