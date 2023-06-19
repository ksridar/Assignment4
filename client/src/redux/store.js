import { configureStore } from '@reduxjs/toolkit';


// Used as guides: - https://www.tutorialspoint.com/redux/index.htm 
//                 - https://blog.logrocket.com/understanding-redux-tutorial-examples/

const ADD_ITEM = 'ADD_ITEM';
const DELETE_ALL = 'DELETE_ALL';
const SET_ITEMS = 'SET_ITEMS';
const EDIT_ITEM = 'EDIT_ITEM';

export const addItem = (item) => ({
  type: ADD_ITEM,
  payload: item,
});

export const deleteAll = () => ({
  type: DELETE_ALL,
});

export const setItems = (items) => ({
  type: SET_ITEMS,
  payload: items,
});

export const editItem = (item) => ({
  type: EDIT_ITEM,
  payload: item,
});

const initialState = {
  items: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_ITEM:
      return {
        ...state,
        items: [...state.items, action.payload],
      };
    case DELETE_ALL:
      return {
        ...state,
        items: [],
      };
    case SET_ITEMS:
      return {
        ...state,
        items: action.payload,
      };
    case EDIT_ITEM:
      const updatedItems = state.items.map((item) =>
        item.name == action.payload.name ? action.payload : item
      );
      return {
        ...state,
        items: updatedItems,
      };
    default:
      return state;
  }
};

// Create store
const store = configureStore({
  reducer: reducer,
});

export default store;
