
import React from 'react';
import ReduxThunk from 'redux-thunk';

import MainNavigation from './Navigation/MainNavigation';

import { createStore, combineReducers, applyMiddleware } from 'redux';
import {Provider} from 'react-redux';
import cartReducer from './store/reducers/cart';
import ordersReducer from './store/reducers/orders';

import productReducer from './store/reducers/products';


const rootReducer = combineReducers({
  products: productReducer,
  cart: cartReducer,
  orders: ordersReducer
})

const store = createStore(rootReducer, applyMiddleware(ReduxThunk))

export default function App() {
  return (
    <Provider store={store}>
    <MainNavigation/>
    </Provider>
  );
}


