import React, {useState, useEffect, useCallback} from 'react';
import { Text, View, StyleSheet, ScrollView, TextInput, Platform, Alert } from 'react-native';
import colors from '../colors/colors';
import { useDispatch } from 'react-redux';
import HeaderButton from '../UI/HeaderButtons';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useSelector } from 'react-redux';
import * as productsActions from '../store/actions/products'



const AddNewProducts = (props) => {
    const dispatch = useDispatch();

    
    const prodId = props.navigation.getParam('productId');
    const prodToEdit = useSelector(state => state.products.userProducts.find(prod => prod.id === prodId)
     );
    

    const[title, setTitle] = useState(prodToEdit ? prodToEdit.title : '');
    const[ImageURL, setImageURL] = useState(prodToEdit ? prodToEdit.imageURL : '');
    const[price, setPrice] = useState(prodToEdit ? prodToEdit.price : '');
    const[description, setDescription] = useState(prodToEdit ? prodToEdit.description : '');

    const submitHandler = useCallback( () => {
        if(prodToEdit){
            dispatch(
                productsActions.updateProduct(prodId, title, description, ImageURL)
            );
        }  else {
            dispatch(
                productsActions.createProduct(title, description, ImageURL, +price)
            );
        }
 props.navigation.goBack();
    }, [dispatch, prodId, title, description, price, ImageURL]);

    useEffect(() => {
        props.navigation.setParams({submit: submitHandler})

    }, [submitHandler]);


    return(
       <ScrollView> 
          <View style={style.form}>
          <View style={style.formEl}>
               <Text style={style.label}> Title</Text>
               <TextInput style={style.input} value={title} onChangeText={text => {setTitle(text)}} />
           </View>
           <View style={style.formEl}>
               <Text style={style.label}> ImageURL</Text>
               <TextInput style={style.input}  value={ImageURL} onChangeText={text => {setImageURL(text)}} />
           </View>
           <View style={style.formEl}>
               <Text style={style.label}> Price</Text>
               <TextInput style={style.input}  value={price} onChangeText={number => {setPrice(number)}}/>
           </View>
           <View style={style.formEl}>
               <Text style={style.label}> Description</Text>
               <TextInput style={style.input} value={description} onChangeText={text => {setDescription(text)}}/>
           </View>
          </View>
       </ScrollView>
    )
};

AddNewProducts.navigationOptions = navData => {
    const submitFn = navData.navigation.getParam('submit')

    return{
        headerTitle: navData.navigation.getParam('productId') ? 'Edit Your Products' : 'Add New Product',
        headerRight: () => <HeaderButtons HeaderButtonComponent={HeaderButton}>
            <Item title='Save' size={43} iconName={Platform.OS ==='android' ? 'md-checkmark' : 'ios-checkmark'} onPress={submitFn} />
        </HeaderButtons>
    }

    }
 

const style = StyleSheet.create({
    form:{
        margin: 20,

    },
    formEl:{
        width:'100%',
 },
 label: {
     marginVertical: 9,
 },
 input: {
     paddingHorizontal: 2,
     paddingVertical: 6,
     borderBottomColor: colors.grey,
     borderBottomWidth: 2
 },


})

export default AddNewProducts;