import { configureStore } from '@reduxjs/toolkit';

import { baseApi } from './api/base.api';
import { reservationSlice } from './slice/reservationSlice';

export const store = configureStore({
  reducer: {
    [reservationSlice.name]: reservationSlice.reducer,
    [baseApi.reducerPath]: baseApi.reducer,
  },

  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(baseApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
