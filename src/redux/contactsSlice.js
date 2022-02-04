import { createSlice, combineReducers } from '@reduxjs/toolkit';

export const contactsSlice = createSlice({
  name: 'contact',
  initialState: JSON.parse(localStorage.getItem('contacts')) ?? [],
  reducers: {
    addItem(state, { payload }) {
      return [payload, ...state];
    },
    deleteItem(state, { payload }) {
      return state.filter(({ id }) => id !== payload);
    },
  },
});
export const filterSlice = createSlice({
  name: 'filter',
  initialState: '',
  reducers: {
    filterContact(_, { payload }) {
      return payload;
    },
  },
});
export const { addItem, deleteItem } = contactsSlice.actions;
export const { filterContact } = filterSlice.actions;

const contactsReducer = combineReducers({
  items: contactsSlice.reducer,
  filter: filterSlice.reducer,
});
export default contactsReducer;
