import React from "react";
import { View, Text, StyleSheet } from "react-native";

const Card = (props) => {
	return (
		<View style={{ ...styles.container, ...props.style }}>
			{props.children}
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		padding: 20,
		shadowColor: "black",
		shadowRadius: 6,
		shadowOpacity: 0.26,
		borderRadius: 10,
		backgroundColor: "white",
	},
});

export default Card;

