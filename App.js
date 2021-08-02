
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import MainNavigation from './Navigation/MainNavigation';
import MyProductsPage from './Screens/MyProductPage';
import { createStore, combineReducers } from 'redux';
import {Provider} from 'react-redux';
import cartReducer from './store/reducers/cart';
import ordersReducer from './store/reducers/orders';

import productReducer from './store/reducers/products';


const rootReducer = combineReducers({
  products: productReducer,
  cart: cartReducer,
  orders: ordersReducer
})

const store = createStore(rootReducer)

export default function App() {
  return (
    <Provider store={store}>
    <MainNavigation/>
    </Provider>
  );
}


