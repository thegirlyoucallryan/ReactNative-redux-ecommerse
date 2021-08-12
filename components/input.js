import React, {useReducer, useEffect} from 'react';
import colors from '../colors/colors';
import { View, Text, StyleSheet, TextInput} from 'react-native';

const INPUT_CHANGE = 'INPUT_CHANGE';
const INPUT_BLUR = 'INPUT_BLUR';

const inputReducer = (state, action) => {
  switch (action.type) {
    case INPUT_CHANGE:
      return {
        ...state,
        value: action.value,
        isValid: action.isValid
      };
    case INPUT_BLUR:
      return {
        ...state,
        touched: true
      };
    default:
      return state;
  }
};

const Input = props => {
  const [inputState, dispatch] = useReducer(inputReducer, {
    value: props.initialValue ? props.initialValue : '',
    isValid: props.initiallyValid,
    touched: false
  });

    const { onInputChange, id } = props;

    useEffect(() => {
      if (inputState.touched) {
        onInputChange(id, inputState.value, inputState.isValid);
      }
    }, [inputState, onInputChange, id]);
  


  const textChangeHandle = text => {
    const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    let isValid = true;
    if (props.required && text.trim().length === 0) {
      isValid = false;
    }
    if (props.email && !emailRegex.test(text.toLowerCase())) {
      isValid = false;
    }
    if (props.min != null && +text < props.min) {
      isValid = false;
    }
    if (props.max != null && +text > props.max) {
      isValid = false;
    }
    if (props.minLength != null && text.length < props.minLength) {
      isValid = false;
    }
    dispatch({ type: INPUT_CHANGE, value: text, isValid: isValid });
  };

  const lostFocusHandle = () => {
    dispatch({ type: INPUT_BLUR });
  };
    
    return(
        <View style={style.formEl}>
        <Text style={style.label}> {props.title}</Text>
        <TextInput {...props} 
         style={style.input}
         Value={inputState.value}
         onChangeText={textChangeHandle}
         onBlur={lostFocusHandle}

     
     
     
      />
      {!inputState.isValid && inputState.touched &&   (<View style={style.errorMsg}>  
       <Text style={style.errorText}> {props.errorMsg}</Text></View> )}
       </View>
    )
}


const style = StyleSheet.create({

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
 errorMsg:{
     marginVertical: 5,

 },

 errorText:{
     color: 'red',
     fontSize: 15

 }

});

export default Input;