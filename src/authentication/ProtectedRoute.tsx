import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const token = localStorage.getItem('token');

  if (!token) {
    // If no token, redirect to the login page
    return <Navigate to="/signin" replace />;
  }

  // Otherwise, render the protected page
  return children;
};

export default ProtectedRoute;