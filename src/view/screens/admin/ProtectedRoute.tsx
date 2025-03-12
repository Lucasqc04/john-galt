import React from 'react';
import { Navigate } from 'react-router-dom';

interface ProtectedRouteProps {
  children: React.ReactElement;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';

  if (!isAuthenticated) {
    console.log('❌ Usuário não autenticado, redirecionando para login');
    return <Navigate to="/admin/login" />;
  }

  console.log('✅ Usuário autenticado, permitindo acesso');
  return children;
};

export default ProtectedRoute;
