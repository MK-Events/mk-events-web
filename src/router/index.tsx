import {
  About,
  Contact,
  EventDetails,
  Events,
  Gallery,
  Home,
  NotFound,
  PrivacyPolicy,
  RefundPolicy,
  Register,
  Terms,
  Tickets,
} from '@mk/pages';
import { createBrowserRouter } from 'react-router-dom';

import { MainLayout } from './MainLayout';

export const router = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [
      { path: '/', element: <Home /> },
      { path: '/events', element: <Events /> },
      { path: '/events/:slug', element: <EventDetails /> },
      { path: '/gallery', element: <Gallery /> },
      { path: '/about', element: <About /> },
      { path: '/contact', element: <Contact /> },
      { path: '/register', element: <Register /> },
      { path: '/register/:slug', element: <Register /> },
      { path: '/tickets', element: <Tickets /> },
      { path: '/privacy-policy', element: <PrivacyPolicy /> },
      { path: '/refund-policy', element: <RefundPolicy /> },
      { path: '/terms', element: <Terms /> },
    ],
    errorElement: <NotFound />,
  },
]);
