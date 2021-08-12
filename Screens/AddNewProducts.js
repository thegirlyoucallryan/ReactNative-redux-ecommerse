import React, {useReducer, useState, useEffect, useCallback} from 'react';
import {  View, StyleSheet, ScrollView,  Platform, Alert, ActivityIndicator} from 'react-native';

import { useDispatch, useSelector } from 'react-redux';
import HeaderButton from '../UI/HeaderButtons';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import * as productsActions from '../store/actions/products';
import Input from '../components/input';
import colors from '../colors/colors';

const FORM_ENTRY = 'FORM_ENTRY';

const formReducer = (state, action) => {
     if(action.type === FORM_ENTRY){
         const updatedValues = {
             ...state.inputValues,
             [action.input]: action.value
         };
         const updatedValidities = {
             ...state.inputValidities,
             [action.input]: action.isValid

         };
         let updatedFormIsValid = true;
         for(const key in updatedValidities) {
            updatedFormIsValid = updatedFormIsValid && updatedValidities[key];
         }
         return {
             formIsValid: updatedFormIsValid,
             inputValues: updatedValues,
             inputValidities: updatedValidities,
             
         };

     }
     return state;

};
    



const AddNewProducts = (props) => {

    const[isLoading, setIsLoading] = useState(false);
    const[error, setError] = useState()
    
    const prodId = props.navigation.getParam('productId');
    const prodToEdit = useSelector(state => state.products.userProducts.find(prod => prod.id === prodId));
    const dispatch = useDispatch();

   const[formState, dispatchForm] = useReducer(formReducer, { 
       inputValues: {
        title: prodToEdit ? prodToEdit.title : '',
        ImageURL: prodToEdit ? prodToEdit.ImageURL : '',
        price: prodToEdit ? prodToEdit.price : '',
        description: prodToEdit ? prodToEdit.description : '',
      
    }, 
    inputValidities: {
        title: prodToEdit ? true : false,
        ImageURL: prodToEdit ? true : false,
        description: prodToEdit ? true : false,
        price: prodToEdit ? true : false,
    },
     formIsValid: prodToEdit ? true : false});
    
    
  
useEffect(() => { 
if(error){
    Alert.alert('An error occurred', error, [{text: 'OK'}] );
}}, [error])


  

     const submitHandler = useCallback(async() => {
        
        if (!formState.formIsValid) {
          Alert.alert('Wrong input!', 'Please check the errors in the form.', [
            { text: 'Okay' }
          ]);
          return;
        }
         setError(null);
         setIsLoading(true);
         try{
        if(prodToEdit){
           await dispatch(
                productsActions.updateProduct(
                    prodId, 
                    formState.inputValues.title,
                     formState.inputValues.description,
                     formState.inputValues.ImageURL,
                      +formState.inputValues.price)
            );
        }  else {
            await dispatch(
                productsActions.createProduct(formState.inputValues.title, formState.inputValues.description, formState.inputValues.ImageURL, +formState.inputValues.price)
            );
        } props.navigation.goBack();
    }catch(error){
        setError(error.message);
    }
        setIsLoading(false);
       
    }, [dispatch, prodId, formState]);





    useEffect(() => {
        props.navigation.setParams({submit: submitHandler})

    }, [submitHandler]);




    const inputValidation = useCallback((id, inputValue, inputValidity) => {
       
       dispatchForm({
           type: FORM_ENTRY,
            value: inputValue, 
            isValid: inputValidity, 
            input: id});
    },[dispatchForm]);


    if(isLoading){
        return(
            <View style={style.center}>
                <ActivityIndicator size='large' color={colors.pink}/>
            </View>
        )
    }

    return(
    
       <ScrollView>
          <View style={style.form}>
              <Input
                id='title'
                errorMsg='Please enter a valid title'
                title= 'title'
                keyboardType='default'
                autoCapitalize='sentences'
                autoCorrect
                returnKeyType='next'
                onInputChange={inputValidation}
                initialValue={prodToEdit ? prodToEdit.title : ''}
                initiallyValid={!!prodToEdit}
                required
     />


<Input
                errorMsg='Please enter valid image url'
                title= 'ImageURL'
                keyboardType='default'
                onInputChange={inputValidation}
                 initialValue={prodToEdit ? prodToEdit.ImageURL : ''}
                 initiallyValid={!!prodToEdit}
                 returnKeyType='next'
                 id="ImageURL"
                 required
     />
           <Input
                id='price'
                errorMsg='Please enter a valid price'
                title= 'price'
                keyboardType='decimal-pad'
                returnKeyType='next'
                min={0.1}
                onInputChange={inputValidation}
                initialValue={prodToEdit ? prodToEdit.price : ''}
                initiallyValid={!!prodToEdit}
     />
       <Input
                errorMsg='Please enter a description'
                title= 'description'
                keyboardType='default'
                autoCapitalize='sentences'
                 autoCorrectnpm
                 multiline
                 numberOfLines={3}
                 initialValue={prodToEdit ? prodToEdit.description : ''}
                 initiallyValid={!!prodToEdit}
                returnKeyType='next'
                onInputChange={inputValidation}
                id='description'
     />
         
          
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
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
 


})

export default AddNewProducts;