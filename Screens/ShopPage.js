import React from 'react';
import {  Alert, StyleSheet, FlatList, Button } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../UI/HeaderButtons'

import ProductItem from '../components/shop/ProductItem';
import colors from '../colors/colors';
import * as productsActions from '../store/actions/products';



const ShopPage = (props) => {
    const userProducts  = useSelector(state => state.products.userProducts);
    const dispatch = useDispatch();

    

    const EditorHandler = (id) => {
      props.navigation.navigate('AddNew', {productId: id});
    };

    
    const deleteHandle = (id) => {
      Alert.alert('Are you Sure?', 'Are you sure you would like to delete this?', [
          {text: 'No', style: 'default'},
          {text: 'Yes', style: 'destructive', onPress: () => {dispatch(productsActions.deleteProduct(id));
          }
         }  
      ]);
    };

    return(
    
            <FlatList
             keyExtractor={item => item.id} 
             data={userProducts} 
             renderItem={itemData => (
              <ProductItem
              image={itemData.item.imageURL}
              title={itemData.item.title}
              price={itemData.item.price}
                onSelect={() => {EditorHandler(itemData.item.id)}}
            
            >
                  <Button color={colors.grey} title='Edit' onPress={()=> {EditorHandler(itemData.item.id)}}/>
                 <Button color={colors.beige} title="Delete" onPress={deleteHandle.bind(this, itemData.item.id)}/>
            </ProductItem>
        )}
            />

            
    )
};

ShopPage.navigationOptions = navData => {
   return {

    headerTitle: 'My Products',
    headerLeft:  () => <HeaderButtons HeaderButtonComponent={HeaderButton} >
    <Item  title='menu' iconName={Platform.OS === "android" ? 'md-menu' : 'ios-menu'} onPress={() => {
      navData.navigation.toggleDrawer();
    }}
      />
     </HeaderButtons>,
      headerRight:  () => <HeaderButtons HeaderButtonComponent={HeaderButton} >
      <Item  title='add' iconName={Platform.OS === "android" ? 'md-create' : 'ios-create'} onPress={() => {
        navData.navigation.navigate('AddNew');
      }}
        />
       </HeaderButtons>
    
     } 
  
   
  
};


const styles = StyleSheet.create({


})

export default ShopPage;