import { createSlice } from '@reduxjs/toolkit';
import {
  fetchContacts,
  deleteContact,
  addContact,
  redactContatc,
} from './operations';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { logOut } from 'components/redux/Redux/Authorization/operations';

const handlePending = state => {
  state.isLoading = true;
  state.error = null;
};

const handleRejected = (state, { payload }) => {
  state.isLoading = false;
  state.error = payload;

  toast.error(
    `${payload}` === 'Network Error'
      ? `${payload}`
      : 'Something went wrong.Check your data and try again'
  );
};

const contactSlice = createSlice({
  name: 'contacts',
  initialState: {
    items: [],
    isLoading: false,
    error: null,
  },

  extraReducers: builder => {
    builder
      .addCase(fetchContacts.pending, handlePending)
      .addCase(fetchContacts.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.error = null;
        state.items = payload;
      })
      .addCase(fetchContacts.rejected, handleRejected)

      .addCase(deleteContact.pending, handlePending)
      .addCase(deleteContact.fulfilled, (state, { payload }) => {
        const index = state.items.findIndex(
          task => task.id === payload.id
        );
        state.items.splice(index, 1);
        state.isLoading = false;
        state.error = null;
      })
      .addCase(deleteContact.rejected, handleRejected)

      .addCase(addContact.pending, handlePending)
      .addCase(addContact.fulfilled, (state, { payload }) => {
        state.items.unshift(payload);
        state.isLoading = false;
        state.error = null;
      })
      .addCase(addContact.rejected, handleRejected)

      .addCase(redactContatc.pending, handlePending)
      .addCase(redactContatc.fulfilled, (state, { payload }) => {
        const index = state.items.findIndex(
          task => task.id === payload.id
        );
        state.items.splice(index, 1);
        state.items.unshift(payload);
        state.isLoading = false;
        state.error = null;
      })
      .addCase(redactContatc.rejected, handleRejected)
      .addCase(logOut.fulfilled, state => {
        state.items = [];
        state.error = null;
        state.isLoading = false;
      });
  },
});

export const contactsReducer = contactSlice.reducer;


