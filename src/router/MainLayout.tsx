import { Footer, Navbar, PWAInstallButton } from '../components';

import { Outlet, ScrollRestoration } from 'react-router-dom';

export const MainLayout = () => {
  return (
    <>
      <Navbar />
      <PWAInstallButton />
      <Outlet />
      <Footer />
      <ScrollRestoration />
    </>
  );
};
