import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { Header } from './components/header';
import { Footer } from './components/footer';

import Index from './pages'
import ProductSearch from './pages/productSearch';
import PaymentPage from './pages/paymentPage';
import Account from './pages/account';
import ProductPage from './pages/productPage';
import ErrorPage from './pages/errorPage';


const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <Index />,
      errorElement: <ErrorPage />,
    },
    {
      path: "/search/:product",
      element: <ProductSearch />,
      errorElement: <ErrorPage />,
    },
    {
      path: "/pay",
      element: <PaymentPage />,
      errorElement: <ErrorPage />,
    },
    {
      path: "/account/:variant",
      element: <Account />,
      errorElement: <ErrorPage />,
    },
    {
      path: "/product/:id",
      element: <ProductPage />,
      errorElement: <ErrorPage />,
    }
  ]
);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <main className="bg-bglight md:w-full w-180">
      <Header></Header>
      <RouterProvider router={router} />
      <Footer></Footer>

    </main>
  </StrictMode>,
)
