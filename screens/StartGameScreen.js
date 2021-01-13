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
import * as sg from "../styles/StartGameStyle";

const StartGameScreen = (props) => {
	// valor introducido
	const [enteredValue, setEnteredValue] = useState("");
	// inicio del juego
	const [confirmed, setConfirmed] = useState(false);
	// numero elegido
	const [selectedNumber, setSelectedNumber] = useState(null);
	// intentos
	const [attemps, setAttemps] = useState(5);
	// número a adivinar
	const [chosenNumber, setChosenNumber] = useState();

	// calcular nuevo numero a adivinar
	const newGameNumber = () => {
		setChosenNumber(Math.floor(Math.random() * (99 - 1) + 1));
	};

	// limpiar todo lo que no sea número
	const numberInputHandler = (inputText) => {
		setEnteredValue(inputText.replace(/[^0-9]/g, ""));
	};

	// iniciar juego con el número elegido
	const confirmInputHandler = () => {
		Keyboard.dismiss();
		// primera vez que se inicia la ronda? genera número a adivinar
		if (!confirmed) newGameNumber(); 
		// conseguir la entrada y verificar que sea un número
		const number = parseInt(enteredValue);
		if (isNaN(number) || number <= 0 || number > 99) {
			// mandar alerta si no es un número
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

		setConfirmed(true);			// marcar ronda como iniciada
		setSelectedNumber(number);	// guardar número que se ha elegido
		setEnteredValue("");		// limpiar entrada
		setAttemps(attemps - 1);	// reducir en 1 los intentos
	};

	// resetear la ronda
	const resetGame = () => {
		Keyboard.dismiss();
		setEnteredValue("");
		setAttemps(5);
		setSelectedNumber(null);
		setConfirmed(false);
		setChosenNumber(0);
	};

	let attempsOutput;		// salida de intentos disponibles
	let confirmedOutput;	// mostrar número elegido
	var distancia = "";		// disntacia del número a adivinar

	// solo si se ha confirmado un nuevo valor elegido
	// comprobar el estado del turno
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
			<View style={sg.style.screen}>
				<Card style={sg.style.card}>
			
					{selectedNumber === chosenNumber ? (
						/* si el número es igual, mostrar texto de que ha ganado*/
						<Fragment>
							<Text style={sg.style.title}>Haz ganado!!</Text>
							<Text style={sg.style.subtitle}>
								Con solo {attemps} intentos restantes!
							</Text>
							<Text style={sg.style.title}>{selectedNumber}</Text>
							<View style={sg.style.buttonResetGame}>
								<Button
									title={"Volver a jugar! :)"}
									onPress={resetGame}
								/>
							</View>
						</Fragment>
					) : (
						/* si no es igual, mostrar los intentos restantes*/
						<Fragment>
							{attemps >= 1 ? (
								<Fragment>
									<Text style={sg.style.title}>
										Secciona un número
									</Text>
									<Input
										style={sg.style.input}
										blurOnSubmit
										autoCapitalize="none"
										maxLength={2}
										onChangeText={numberInputHandler}
										value={enteredValue}
										keyboardType={"number-pad"}
									/>
									<View style={sg.style.buttonContainer}>
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
									<Text style={sg.style.title}>
										Haz perdido :c
									</Text>
									<Text style={sg.style.title}>
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
					// solo mostrar los intentos si no se ha adivinado el número
					<Fragment>
						{confirmed ? (
							<Card style={sg.style.cardChosen}>
								{confirmedOutput}
							</Card>
						) : null}
						<Card style={sg.style.cardChosen}>{attempsOutput}</Card>
					</Fragment>
				)}
			</View>
		</TouchableWithoutFeedback>
	);
};

export default StartGameScreen;
