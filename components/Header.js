import React from "react";
import { View, Text, StyleSheet } from "react-native";

const Header = (props) => {
	return (
		<View style={styles.header}>
			<Text style={styles.headerTitulo}>{props.title}</Text>
		</View>
	);
};

const styles = StyleSheet.create({
	header: {
		width: "100%",
		height: 90,
		padding: 24,
		backgroundColor: "#6a2c70",
		alignItems: "center",
		justifyContent: "center",
	},
	headerTitulo: { color: "#eeeeee", fontSize: 24 },
});

export default Header;
