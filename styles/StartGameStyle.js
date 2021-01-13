import {StyleSheet} from "react-native";
import Colors from "react-native/Libraries/NewAppScreen/components/Colors";
export const style = StyleSheet.create({
	screen: {
		flex: 1,
		padding: 10,
		alignItems: "center",
		backgroundColor: "#fbecec",
	},
	title: {
		fontSize: 20,
		marginVertical: 10,
		alignSelf: "center",
		paddingBottom: 5,
	},
	subtitle: {
		fontSize: 18,
		marginVertical: 10,
		alignSelf: "center",
		paddingBottom: 5,
	},
	buttonContainer: {
		marginTop: 15,
		flexDirection: "row",
		justifyContent: "space-between",
		paddingHorizontal: 15,
	},
	buttonResetGame: {
		marginTop: 5,
		flexDirection: "row",
		alignSelf: "center",
		paddingHorizontal: 15,
	},
	inputContainer: {
		backgroundColor: "#440047",
		borderRadius: 10,
		fontSize: 18,
		height: "20%",
	},
	card: {
		marginTop: 20,
		width: "80%",
		height: "40%",
		backgroundColor: "#f9ed69",
	},
	cardChosen: {
		marginTop: 20,
		width: "80%",
	},
	input: {
		width: 60,
		backgroundColor: "#f6416c",
		textAlign: "center",
		alignSelf: "center",
		borderRadius: 12,
		color: "white",
		fontSize: 20,
	},
});