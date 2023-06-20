import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';

// Action types
const ADD_ITEM = 'ADD_ITEM';
const DELETE_ALL = 'DELETE_ALL';
const SET_ITEMS = 'SET_ITEMS';
const EDIT_ITEM = 'EDIT_ITEM';
const DELETE_ITEM = 'DELETE_ITEM';

// Action creators
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

export const deleteItem = (itemId) => ({
  type: DELETE_ITEM,
  payload: itemId,
});

// Thunk action creator for fetching items from the server
export const fetchItems = () => {
  return (dispatch) => {
    return fetch('http://localhost:3001/items')
      .then((response) => response.json())
      .then((data) => dispatch(setItems(data)))
      .catch((error) => console.log(error));
  };
};

// Thunk action creator for adding an item
export const addItemAsync = (item) => {
  return (dispatch) => {
    return fetch('http://localhost:3001/items', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(item),
    })
      .then((response) => response.json())
      .then((data) => dispatch(addItem(data)))
      .catch((error) => console.log(error));
  };
};

// Thunk action creator for editing an item
export const editItemAsync = (item) => {
  return (dispatch) => {
    return fetch(`http://localhost:3001/items/${item.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(item),
    })
      .then((response) => response.json())
      .then(() => {
        dispatch(editItem(item));
        return Promise.resolve(); // Resolve the Promise after dispatching the action
      })
      .catch((error) => console.log(error));
  };
};

export const deleteAllAsync = () => {
  return (dispatch) => {
    return fetch('http://localhost:3001/items', {
      method: 'DELETE',
    })
      .then((response) => {
        if (response.ok) {
          dispatch(deleteAll());
        }
      })
      .catch((error) => console.log(error));
  };
};


// Thunk action creator for deleting an item
export const deleteItemAsync = (itemId) => {
  return (dispatch) => {
    return fetch(`http://localhost:3001/items/${itemId}`, {
      method: 'DELETE',
    })
      .then((response) => response.json())
      .then(() => dispatch(deleteItem(itemId)))
      .catch((error) => console.log(error));
  };
};

const initialState = {
  items: [],
};

const itemsReducer = (state = initialState.items, action) => {
  switch (action.type) {
    case ADD_ITEM:
      return [...state, action.payload];
    case DELETE_ALL:
      return [];
    case SET_ITEMS:
      return action.payload;
    case EDIT_ITEM:
      return state.map((item) =>
        item.id === action.payload.id ? action.payload : item
      );
    case DELETE_ITEM:
      return state.filter((item) => item.id !== action.payload);
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  items: itemsReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));
store.dispatch(fetchItems());

export default store;
