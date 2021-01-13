import React, { useState, Fragment } from "react";
import {
	View,
	Text,
	StyleSheet,
	TextInput,
	Button,
	TouchableWithoutFeedback,
	Keyboard,
	Alert,
} from "react-native";
import Card from "../components/Card";
import Input from "../components/Input";

const StartGameScreen = (props) => {
	// valor introducido
	const [enteredValue, setEnteredValue] = useState("");
	// inicio del juego
	const [confirmed, setConfirmed] = useState(false);
	// numero elegido
	const [selectedNumber, setSelectedNumber] = useState(null);
	// intentos
	const [attemps, setAttemps] = useState(5);
	// numero generado
	const [chosenNumber, setChosenNumber] = useState();

	const newGameNumber = () => {
		setChosenNumber(Math.floor(Math.random() * (99 - 1) + 1));
	};

	const numberInputHandler = (inputText) => {
		setEnteredValue(inputText.replace(/[^0-9]/g, ""));
	};

	const confirmInputHandler = () => {
		Keyboard.dismiss();
		if (!confirmed)
			setChosenNumber(Math.floor(Math.random() * (99 - 1) + 1));
		const number = parseInt(enteredValue);
		if (isNaN(number) || number <= 0 || number > 99) {
			Alert.alert(
				"Introduce un número váilido",
				"el numero debe estar entre 1 y 99",
				[
					{
						text: "okay",
						style: "destructive",
						onPress: resetInputHandler,
					},
				]
			);
			return;
		}

		setConfirmed(true);
		setSelectedNumber(number);
		setEnteredValue("");
		setAttemps(attemps - 1);
	};

	const resetInputHandler = () => {
		setEnteredValue("");
	};

	const resetGame = () => {
		Keyboard.dismiss();
		setEnteredValue("");
		setAttemps(5);
		resetInputHandler;
		setSelectedNumber(null);
		setConfirmed(false);
		setChosenNumber(0);
	};

	let attempsOutput;
	let confirmedOutput;
	var distancia = "";
	let win = false;

	if (confirmed) {
		confirmedOutput = <Text>Número elegido: {selectedNumber}</Text>;
		if (
			selectedNumber <= chosenNumber + 10 &&
			selectedNumber >= chosenNumber - 10
		) {
			distancia = "cerca";
		} else {
			distancia = "lejos";
		}
		attempsOutput = (
			<Text>
				Estás {distancia}, te quedan {attemps} intentos.
			</Text>
		);
	} else {
		attempsOutput = <Text>Te quedan {attemps} intentos.</Text>;
	}

	return (
		<TouchableWithoutFeedback
			onPress={() => {
				Keyboard.dismiss();
			}}
		>
			<View style={style.screen}>
				<Card style={style.card}>
					{selectedNumber === chosenNumber ? (
						<Fragment>
							<Text style={style.title}>Haz ganado!!</Text>
							<Text style={style.subtitle}>
								Con solo {attemps} intentos restantes!
							</Text>
							<Text style={style.title}>{selectedNumber}</Text>
							<View style={style.buttonResetGame}>
								<Button
									title={"Volver a jugar! :)"}
									onPress={resetGame}
								/>
							</View>
						</Fragment>
					) : (
						<Fragment>
							{attemps >= 1 ? (
								<Fragment>
									<Text style={style.title}>
										Secciona un número
									</Text>
									<Input
										style={style.input}
										blurOnSubmit
										autoCapitalize="none"
										maxLength={2}
										onChangeText={numberInputHandler}
										value={enteredValue}
										keyboardType={"number-pad"}
									/>
									<View style={style.buttonContainer}>
										<Button
											title={"Reiniciar"}
											onPress={resetGame}
										/>
										<Button
											title={"Confirmar"}
											onPress={confirmInputHandler}
										/>
									</View>
								</Fragment>
							) : (
								<Fragment>
									<Text style={style.title}>
										Haz perdido :c
									</Text>
									<Text style={style.title}>
										El número era {chosenNumber}
									</Text>
									<Button
										title={"Jugar de nuevo"}
										onPress={resetGame}
									/>
								</Fragment>
							)}
						</Fragment>
					)}
				</Card>
				{selectedNumber === chosenNumber ? null : (
					<Fragment>
						{confirmed ? (
							<Card style={style.cardChosen}>
								{confirmedOutput}
							</Card>
						) : null}
						<Card style={style.cardChosen}>{attempsOutput}</Card>
					</Fragment>
				)}
			</View>
		</TouchableWithoutFeedback>
	);
};

const style = StyleSheet.create({
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

export default StartGameScreen;
