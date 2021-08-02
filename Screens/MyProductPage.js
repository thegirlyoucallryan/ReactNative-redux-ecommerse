import React from 'react';
import { Text, View, StyleSheet, Button, FlatList, Platform } from 'react-native';


import { useDispatch, useSelector } from 'react-redux';
import colors from '../colors/colors'
import ProductItem from '../components/shop/ProductItem';
import * as cartActions from '../store/actions/cart';
import { Item, HeaderButtons } from 'react-navigation-header-buttons';
import HeaderButton from '../UI/HeaderButtons';






const MyProductsPage = (props) => {
  const products  = useSelector(state => state.products.availableProducts);
  const dispatch = useDispatch();

  const selectItemHandler = (id, title) => {
    props.navigation.navigate('Item',{
      productId: id,
      productTitle: title
    
    });

  }

    return(
        
        <View>
            <Text>Manage your Products here.</Text>
            <FlatList keyExtractor={item => item.id} data={products} renderItem={itemData => (<ProductItem
            image={itemData.item.imageURL}
            title={itemData.item.title}
            price={itemData.item.price}
            onSelect={() => { selectItemHandler(itemData.item.id, itemData.item.title)
          }}
          >
                <Button color={colors.grey} title='View Details' onPress={()=> selectItemHandler(itemData.item.id, itemData.item.title)}/>
                 <Button color={colors.beige} title="Add to Cart" onPress={() => dispatch(cartActions.addToCart(itemData.item))
                }/>
            </ProductItem>
            )}/>

           
            
            <Button color={colors.grey} title="add new products" onPress={()  => {props.navigation.navigate({routeName: "AddNew"})}}/>
        </View>
       
    )
}


MyProductsPage.navigationOptions = navData => {
  return {
  headerTitle: 'All Products',
  headerLeft:  () => <HeaderButtons HeaderButtonComponent={HeaderButton} >
  <Item  title='menu' iconName={Platform.OS === "android" ? 'md-menu' : 'ios-menu'} onPress={() => {
    navData.navigation.toggleDrawer();
  }}
    />
   </HeaderButtons>, 

  headerRight: () => <HeaderButtons HeaderButtonComponent={HeaderButton} >
    <Item  title='cart' iconName={Platform.OS === "android" ? 'md-cart' : 'ios-cart'} onPress={() => {
      navData.navigation.navigate('MyCart')}}
      />
     </HeaderButtons>
}
}



export default MyProductsPage;

