import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('access_token');

  console.log(token)

  if (!token) {
    // Se o token não estiver presente, redireciona para a página de login
    return <Navigate to="/login" />;
  }

  // Se o token estiver presente, renderiza o conteúdo da rota protegida
  return children;
};

export default ProtectedRoute;
