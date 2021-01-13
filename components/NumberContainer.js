import React from 'react';
import {View, Text } 'react-native';

const NumberContainer = props =>{
	return(<View>
		<Text>{props.children}</Text>
	</View>)
}

const styles = StyleSheet.create({
	container:{
		borderWidth: 2,
		borderColor:"black",
		padding:10, 
		borderRadius: 10,
		marginVertical: 10,
		alignItems: 'center',
		 
	}
})

export default NumberContainer;