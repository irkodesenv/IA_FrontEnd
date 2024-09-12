import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App.js';
import reportWebVitals from './reportWebVitals';
import Login from './Login';

import {createBrowserRouter, RouterProvider, Navigate} from "react-router-dom";
import ErrorPage from './routers/ErrorPage.jsx';
import { ChatPage } from './pages/ChatPage.jsx';
import { AgentePage } from './pages/AgentePage.jsx';
import { HomePage } from './pages/HomePage.jsx';

const root = ReactDOM.createRoot(document.getElementById('root'));

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "login",
        element: <Login />
      },
      {
        path: "/",
        element: <HomePage />
      },
      {
        path: "chat",
        element: <ChatPage />
      },
      {
        path: "agentes",
        element: <AgentePage />
      }
    ]
  },
])

root.render(
    <RouterProvider router={router} />
);

reportWebVitals();
