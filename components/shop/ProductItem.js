import React from 'react';
import { View, Text, Image, StyleSheet, Button, TouchableNativeFeedback} from 'react-native';
import Card from '../Card';
import colors from '../../colors/colors';




const ProductItem = props => {
    let price = +props.price;

price = price.toFixed(2)

    return(
        <Card>
            
        <View style={styles.product}>
         <View style={styles.touch}>
          <TouchableNativeFeedback onPress={props.onSelect} useForeground>
            <View>
                 <Image source={{uri: props.image}}  style={{width:'100%',
                height:'65%'}}/>
               <View style={styles.textBox}>
                  <Text style={styles.title}>{props.title}</Text>
                  <Text style={styles.price}>${price}</Text>
                </View>
       
              <View style={styles.actions}>
               {props.children}
        
            
                 </View>
                 </View>
        </TouchableNativeFeedback>
       </View>
        </View>
        
        </Card>
    )

}

const styles = StyleSheet.create({
    product:{
        flex: 1,
        elevation: 5,
        borderRadius: 7,
        height: 300,
        width: 290,
        backgroundColor: 'white',
        overflow: 'hidden',
       
        
    },
    touch:{
        overflow: 'hidden',
    },
    textBox:{

        alignItems: 'center',
        height: '15%',
        padding: 10
    },

    price: {
        fontSize: 14,
        marginHorizontal: 3,
        color: colors.medBrown,
    },

    actions:{
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        marginVertical: 12,
        
    },
    title:{
        fontSize: 18,
        color: colors.brown
    }
   


})

export default ProductItem;