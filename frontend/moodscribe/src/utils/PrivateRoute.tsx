import React from 'react';
import { Navigate } from 'react-router-dom';

// Define the props for PrivateRoute
interface PrivateRouteProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  element: React.ComponentType<any>;
  isAuthenticated: boolean;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({
  element: Component,
  isAuthenticated,
  ...rest
}) => {
  return isAuthenticated ? (
    <Component {...rest} />
  ) : (
    <Navigate to='/auth/signin' />
  );
};

export default PrivateRoute;
