import { useEffect } from 'react';

import { Footer, Navbar, PWAInstallButton } from '../components';

import { Outlet, useLocation } from 'react-router-dom';

function RouteScrollToTop() {
  const location = useLocation();

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, [location.pathname, location.search]);

  return null;
}

export const MainLayout = () => {
  return (
    <>
      <RouteScrollToTop />
      <Navbar />
      <PWAInstallButton />
      <Outlet />
      <Footer />
    </>
  );
};
