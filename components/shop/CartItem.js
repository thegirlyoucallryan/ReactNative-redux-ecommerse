import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import colors from '../../colors/colors';
import { useSelector } from 'react-redux';


const CartItem = (props) => {
    const products  = useSelector(state => state.products.availableProducts);
    
    return(
        <View style={styles.cartItem}>
           <Text style={styles.itemData}>
           <Text style={styles.mainText}> {props.quantity}</Text>
           <TouchableOpacity onPress={()=> {
            //    props.navigation.navigate('Item',{ productId: products.id,
            //   productTitle: products.title
            
        //    });
           }} >
            <Text style= {styles.mainText} >{props.title.substring(0, 15)} </Text>
            </TouchableOpacity>
           </Text>
           <View style={styles.itemData}>
               <Text style={styles.amount}>{props.amount}</Text>
              {props.deletable && (<TouchableOpacity onPress={props.onRemove} style={styles.delete}>
                   <Ionicons name={Platform.OS === 'android' ? 'md-trash' :'ios-trash'} size={23} color='red'/>
               </TouchableOpacity>)}
           </View>
        </View>
    )
};
const styles = StyleSheet.create({

    delete:{
        margin: 15
    },

    cartItem:{
        padding: 5,
        paddingHorizontal: 5,
        maxWidth: "95%",
        backgroundColor: 'white',
        paddingHorizontal: 20,
        padding: 10,
        marginHorizontal: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderRadius: 5,
        marginBottom: 3,
        flexWrap: 'wrap'
        


      },
      itemData: {
          flexDirection: 'row',
          alignItems: 'center'

      },
      mainText: {
          color: colors.brown,
          fontSize: 18,
          
      },
      amount: {
          color: colors.medBrown,
          fontWeight: 'bold',
      }
    
    


});

export default CartItem;