import '@mantine/carousel/styles.css';
import { ColorSchemeScript, MantineProvider } from '@mantine/core';
import '@mantine/core/styles.css';
import { Notifications } from '@mantine/notifications';
import { theme } from '@mk/theme';
import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router-dom';

import './App.css';
import { router } from './router';
import { store } from './store';

function App() {
  return (
    <Provider store={store}>
      <ColorSchemeScript />
      <MantineProvider theme={theme}>
        <Notifications position="top-right" />
        <RouterProvider router={router} />
      </MantineProvider>
    </Provider>
  );
}

export default App;
