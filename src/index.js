import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App.js';
import reportWebVitals from './reportWebVitals';
import Login from './Login';

import {createBrowserRouter, RouterProvider} from "react-router-dom";
import ErrorPage from './routers/ErrorPage.jsx';
import { ChatPage } from './pages/ChatPage.jsx';
import { AgentePage } from './pages/AgentePage.jsx';
import { HomePage } from './pages/HomePage.jsx';
import { UsuariosPage } from './pages/UsuariosPage.jsx';
import ProtectedRoute  from './routers/ProtectedRoute.jsx';

const root = ReactDOM.createRoot(document.getElementById('root'));

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [      
      {
        path: "/",
        element: (
          <ProtectedRoute>
            <HomePage />
          </ProtectedRoute>
        )
      },
      {
        path: "chat",
        element: (
          <ProtectedRoute>
            <ChatPage />
          </ProtectedRoute>
        )
      },
      {
        path: "agentes",
        element: (
          <ProtectedRoute>
            <AgentePage />
          </ProtectedRoute>
        )
      },
      {
        path: "usuarios",
        element:(
          <ProtectedRoute>
            <UsuariosPage />
          </ProtectedRoute>
        ) 
      }
    ]
  },
])

root.render(
    <RouterProvider router={router} />
);

reportWebVitals();
