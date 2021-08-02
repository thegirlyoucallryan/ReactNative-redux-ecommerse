import React, {useState} from 'react';
import { Text, Button, StyleSheet, View } from 'react-native';

import CartItem from './CartItem';
import Card from '../Card';
import colors from '../../colors/colors';

const OrderItem = props => {
    const [showDetails, setShowDetails] = useState(false)
    return(
     
    <View style={styles.orderItem}>
        <View style={styles.summary}>
            <Text style={styles.total}>${props.amount.toFixed(2)}</Text>
            <Text style={styles.date}>{props.date}</Text>
        </View>
      
        <Button color={colors.grey} title={showDetails ? 'Hide Details' : 'Show Details'} onPress={() => {setShowDetails(prevState => !prevState)}} />
        {showDetails && (<View style={styles.detailItems}>
            {props.items.map(cartItem => (
            <CartItem 
            key={cartItem.productId}
            quantity={cartItem.quantity}
            amount={cartItem.sum}
            title={cartItem.productTitle}

            
            
            />))
         } 
         </View>
         )}
     </View>

    
    );


};

const styles = StyleSheet.create({

    orderItem:{
        elevation: 6,
        borderRadius: 10,
        backgroundColor: 'white',
        padding: 20,
        margin: 10,
        alignItems: 'center'


    },

    summary:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        marginBottom: 15
    },

    total: {
        fontSize: 16,

    },
    date: {
        color: colors.brown
    },
    detailItems:{
        width: '100%',

    }

})

export default OrderItem;