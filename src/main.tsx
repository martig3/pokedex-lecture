/* eslint-disable @typescript-eslint/no-unsafe-call */
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App';
import './index.css';
import { loader as rootLoader } from './App';
import { loader as pokemonLoader } from './pokemon';
import Pokemon from './pokemon';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    loader: rootLoader,
    children: [
      {
        path: '/pokemon/:name',
        element: <Pokemon />,
        loader: pokemonLoader,
      },
    ],
  },
]);

// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
