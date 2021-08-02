import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import colors from '../colors/colors';


const Card= (props) => {

    return(
        <View style={styles.container}>
            {props.children}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.beige,
      alignItems: 'center',
      justifyContent: 'center',
      padding: 20,
      margin: 30,
      borderRadius: 6,
      elevation: 5,
    },
  });


export default Card;