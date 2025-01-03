import React from 'react';
import { Navigate } from 'react-router-dom';
//import { jwtDecode } from "jwt-decode";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('access_token');

  if (!token) {
    // Se o token não estiver presente, redireciona para a página de login
    return <Navigate to={`/login`} />;
  }
  /*
  else{
    const decodedToken = jwtDecode(token); // Decodifica o token
    const username = decodedToken?.username || "Irko";
  }
  */

  return children;
};

export default ProtectedRoute;
