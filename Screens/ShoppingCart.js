import React from 'react';
import { Text, View, StyleSheet, Button, FlatList } from 'react-native';
import Card from '../components/Card';
import {useSelector, useDispatch} from 'react-redux';
import * as cartActions from '../store/actions/cart';
import * as ordersActions from '../store/actions/orders';

import colors from '../colors/colors';
import CartItem from '../components/shop/CartItem';


const ShoppingCart = (props) => {

    const cartTotalAmount = useSelector(state => state.cart.total);
    const cartItems = useSelector(state => {
        const transformedCartItems = [];
        
        for(const key in state.cart.items){
            transformedCartItems.push({
                productId: key,
                productTitle: state.cart.items[key].productTitle,
                productPrice: state.cart.items[key].productPrice,
                quantity: state.cart.items[key].quantity,
                sum: state.cart.items[key].sum
    
            });
        }
        return transformedCartItems.sort((a,b) => a.productId > b.productId ? 1 : -1);
       

        
        });
        const dispatch = useDispatch();

    return(
        
<Card>
        <View style={styles.orderBox}> 
           
            <Text> Total: <Text style={styles.price}>${Math.round(cartTotalAmount.toFixed(2) *100) / 100}</Text></Text>

            
            
        </View>
        <FlatList data={cartItems} keyExtractor={item => item.productId} renderItem={itemData =>
             <CartItem 
             navigation={props.navigation} 
             quantity={itemData.item.quantity} 
             title={itemData.item.productTitle} 
             amount={itemData.item.sum}
             deletable
              onRemove={() => {dispatch(cartActions.removeFromCart(itemData.item.productId))}}/>}>
            
        </FlatList>
        <View style={styles.orderButtons}>
        <Button 
        title='View Details' 
        color={colors.grey} 
        disabled={cartItems.length === 0} 
        onPress={() => props.navigation.navigate({routeName: 'Order'})}/>
            <Button title='Buy Now' 
            color={colors.brown} 
            onPress={() => {dispatch(ordersActions.addOrder(cartItems, cartTotalAmount))}}/>
        </View>
        <View style={styles.adjustments}>
       
            
        </View>

        </Card>
    )
};


ShoppingCart.navigationOptions = {
    headerTitle: 'Your Cart'
};

const styles = StyleSheet.create({
    orderButtons: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
    },

    adjustments:{
        flexDirection:'row',
        
        justifyContent: 'space-evenly',
        padding: 10,
        marginHorizontal: 10,

    },
    price:{
        color: colors.medBrown,
        fontSize: 18,
    },
    orderBox: {
        
        backgroundColor: 'white',
        padding: 20,
        elevation: 7,
        borderRadius: 8,
        marginVertical: 10,

    }

})

export default ShoppingCart;




// {Math.round(cartTotalAmount.toFixed(2) *100) / 100}  ensures no negative numbers in total after deletion of items