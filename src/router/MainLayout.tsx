import { Footer, Navbar } from '../components';

import { Outlet, ScrollRestoration } from 'react-router-dom';

export const MainLayout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
      <ScrollRestoration />
    </>
  );
};
