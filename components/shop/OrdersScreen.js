import React from 'react';
import { useSelector } from 'react-redux';



import { Text,  FlatList, Platform, StyleSheet} from 'react-native';
import HeaderButton from '../../UI/HeaderButtons'
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import OrderItem from './OrderItem';
import colors from '../../colors/colors';


const OrdersScreen = props => {
    const orders = useSelector(state =>  state.orders.orders)

    if(orders.length === 0){
      return(
        <Text style={styles.display}> No Orders Yet!  :)</Text>
      )
    }
    
    return(
      
      
          <FlatList data={orders}
             keyExtractor={item => item.id}
              renderItem={ itemData => (
              <OrderItem 
              amount={itemData.item.totalAmount} 
              date={itemData.item.readableDate}
              items={itemData.item.items}
              />
              )}
               
                   />

      
    );


};

OrdersScreen.navigationOptions = navData => {
  return {
    headerTitle: 'Your Orders', 
    headerLeft: (
        <HeaderButtons HeaderButtonComponent={HeaderButton}>
            <Item
            title="Menu"
            iconName={Platform.OS === "android" ? 'md-menu': 'ios-menu'}
            onPress={()=> {
                navData.navigation.toggleDrawer();
            }}
            />
        </HeaderButtons>
    )
  } 
};

const styles = StyleSheet.create({
  display:{
    alignSelf: 'center',
    marginTop: 100,
    fontSize: 22,
    color: colors.medBrown,
   
    
    
    
  
  }

})

export default OrdersScreen;