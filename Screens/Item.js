import React from 'react';
import { Text, View, StyleSheet, Button, ScrollView, Image } from 'react-native';
import Card from '../components/Card';
import ShoppingCart from './ShoppingCart';
import { useDispatch, useSelector } from 'react-redux';
import colors from '../colors/colors';
import * as cartActions from '../store/actions/cart'



const Item = (props) => {
  const productId = props.navigation.getParam('productId');
  const selectedProduct = useSelector(state => state.products.availableProducts.find(prod => prod.id === productId));
  const dispatch = useDispatch();


    return(
        
          <ScrollView>
             <Card>
            <View style={styles.container}>
             <Image source={{uri: selectedProduct.URL}} style={{width: '100%', height: 300}}/>
            
               
               <Text style={styles.price}>${selectedProduct.price}</Text>

             <View style={styles.descriptionBox}>
                  <Text style={styles.description}>{selectedProduct.description}</Text>
             </View>
                <Button  style={styles.button} color='#40211E' title="Add to Cart" onPress={()  => {dispatch(cartActions.addToCart(selectedProduct));
                }}/>
            </View>
          </Card>
          </ScrollView>
       
    )
}

Item.navigationOptions = navData => {
  
 
  return{
    headerTitle: () => {navData.navigation.getParam('productTitle')}
  }
    
  
  
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 10,
      margin: 20,
    
      borderRadius: 4,
    },
price: {
  fontSize: 19,
  color: colors.medBrown,
  textAlign: 'center',
  margin: 10,

},

description:{
  color: colors.grey,
  textAlign: 'center'

},
descriptionBox:{
  alignItems: 'center',
  justifyContent: 'center',
  padding: 30,
},



    
 
  });

export default Item;