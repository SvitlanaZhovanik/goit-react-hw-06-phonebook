import { createSlice } from '@reduxjs/toolkit';

export const contactsSlice = createSlice({
  name: 'contact',
  initialState: {
    items: JSON.parse(localStorage.getItem('contacts')) ?? [],
    filter: '',
  },
  reducers: {
    addItem: (state, { payload }) => ({ ...state, items: [...state.items, payload] }),
    deleteItem: (state, { payload }) => ({
      ...state,
      items: state.items.filter(({ id }) => id !== payload),
    }),
    filterContact: (state, { payload }) => {
      return { ...state, filter: payload };
    },
  },
});
export const { addItem, deleteItem, filterContact } = contactsSlice.actions;
