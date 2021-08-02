import { createStackNavigator} from "react-navigation-stack";
import { createAppContainer} from "react-navigation";
import { createDrawerNavigator } from "react-navigation-drawer";
import AddNewProducts from "../Screens/AddNewProducts";
import MyProductsPage from "../Screens/MyProductPage";
import ShopPage from "../Screens/ShopPage";
import ShoppingCart from "../Screens/ShoppingCart";
import Item from "../Screens/Item";
import colors from '../colors/colors';
import { Platform } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import React from 'react';
import OrdersScreen from "../components/shop/OrdersScreen";

const defaultNavOptions = {
    
        headerStyle:{
 
         backgroundColor: colors.pink,
     },
     headerTintColor: colors.brown,
 
     };
 




const MainNavigation = createStackNavigator({
    
    MyProducts: MyProductsPage,
    MyCart: ShoppingCart,
    Item: Item,     
     
   

},{ navigationOptions: {
    drawerIcon: drawerConfig => <Ionicons name={Platform.OS === "android" ? 'md-cart' : 'ios-cart'} 
    size={23}
    color={drawerConfig.activeTintColor}/>
}, 
    defaultNavigationOptions: defaultNavOptions

});

const OrdersNavigator = createStackNavigator({
    Orders: OrdersScreen,
   
},
{
    navigationOptions: {
        drawerIcon: drawerConfig => <Ionicons name={Platform.OS === "android" ? 'md-list' : 'ios-list'} 
        size={23}
        color={drawerConfig.activeTintColor}/>
    },

 
    defaultNavigationOptions: defaultNavOptions
});

const UserNavigator = createStackNavigator({
    UserProducts: ShopPage,
    AddNew: AddNewProducts
   
},
{
    navigationOptions: {
        drawerIcon: drawerConfig => <Ionicons name={Platform.OS === "android" ? 'md-create' : 'ios-create'} 
        size={23}
        color={drawerConfig.activeTintColor}/>
    },

 
    defaultNavigationOptions: defaultNavOptions
});


const shopNavigator = createDrawerNavigator ({
    Products: MainNavigation,
    Orders: OrdersNavigator,
    Admin: UserNavigator
    

},{
    contentOptions: {
        activeTintColor: colors.pink
    }
})


export default createAppContainer(shopNavigator);


