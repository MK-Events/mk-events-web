import type { ReservationErrorState } from '@mk/components';
import type { ReservationResponse } from '@mk/types/Reservation.type';
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

const reservationdata: ReservationResponse = {
  reservation: {
    stage: 'WELCOME',
  },
} as ReservationResponse;

const reservationError: ReservationErrorState = {} as ReservationErrorState;

export const reservationSlice = createSlice({
  name: 'reservation',
  initialState: {
    reservationdata,
    reservationError,
  },
  reducers: {
    // This action function updates the state when data is received
    setReservationData: (state, action: PayloadAction<ReservationResponse>) => {
      state.reservationdata = action.payload; // action.payload contains the data
    },
    clearReservationData: (state) => {
      state.reservationdata = {} as ReservationResponse;
    },
    setReservationError: (state, action: PayloadAction<ReservationErrorState>) => {
      state.reservationError = action.payload; // action.payload contains the data
    },
    clearReservationError: (state) => {
      state.reservationError = {} as ReservationErrorState;
    },
    resetAll: (state) => {
      state.reservationError = {} as ReservationErrorState;
      state.reservationdata = {
        reservation: {
          stage: 'WELCOME',
        },
      } as ReservationResponse;
    },
  },
});

// Export actions to use in components
export const {
  setReservationData,
  clearReservationData,
  setReservationError,
  clearReservationError,
  resetAll,
} = reservationSlice.actions;
