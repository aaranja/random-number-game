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
	const [values, setValues] = useState({
		enteredValue: "",		// valor introducido
		confirmed: false,		// inicio del juego
		selectedNumber: 0,		// numero elegido
		attemps: 5,				// intentos
		chosenNumber: null,		// número a adivinar
	});

	// limpiar todo lo que no sea número
	const numberInputHandler = (inputText) => {
		setValues({...values, enteredValue: inputText.replace(/[^0-9]/g, "")})
	};

	// resetear entrada
	const resetInputHandler = () => {setValues({...values, enteredValue: ""})}

	// iniciar juego con el número elegido
	const confirmInputHandler = () => {
		let old_cn = values.chosenNumber;
		Keyboard.dismiss();
		// primera vez que se inicia la ronda? genera número a adivinar
		if (!values.confirmed) old_cn = Math.floor(Math.random() * (99 - 1) + 1);
		// conseguir la entrada y verificar que sea un número
		const number = parseInt(values.enteredValue);
		if (isNaN(number) || number <= 0 || number > 99) {
			// mandar alerta si no es un número
			Alert.alert(
				"Introduce un número váilido",
				"el numero debe estar entre 1 y 99",
				[{
						text: "okay",
						style: "destructive",
						onPress: resetInputHandler,
				},]
			);
			return;
		}
		// guardar valores y volver a renderizar el componente
		setValues({	...values,
			enteredValue: "",				// limpiar entrada
			confirmed: true,				// marcar ronda como iniciada
			selectedNumber: number,			// guardar número que se ha elegido
			attemps: (values.attemps -1),	// reducir en 1 los intentos*/
			chosenNumber: old_cn,
		});
	};

	// resetear la ronda
	const resetGame = () => {
		Keyboard.dismiss();
		setValues({	...values,
			enteredValue: "",
			confirmed: false,
			selectedNumber: 0,
			attemps: 5,
			chosenNumber: null,
		});
	};

	let attempsOutput;		// salida de intentos disponibles
	let confirmedOutput;	// mostrar número elegido
	var distancia = "";		// disntacia del número a adivinar

	// solo si se ha confirmado un nuevo valor elegido
	// comprobar el estado del turno
	if (values.confirmed) {
		confirmedOutput = <Text>Número elegido: {values.selectedNumber}</Text>;
		if (
			values.selectedNumber <= values.chosenNumber + 10 &&
			values.selectedNumber >= values.chosenNumber - 10
		) {
			distancia = "cerca";
		} else {
			distancia = "lejos";
		}
		attempsOutput = (
			<Text>
				Estás {distancia}, te quedan {values.attemps} intentos.
			</Text>
		);
	} else {
		attempsOutput = <Text>Te quedan {values.attemps} intentos.</Text>;
	}

	return (
		<TouchableWithoutFeedback
			onPress={() => {
				Keyboard.dismiss();
			}}
		>
			<View style={sg.style.screen}>
				<Card style={sg.style.card}>
			
					{values.selectedNumber === values.chosenNumber ? (
						/* si el número es igual, mostrar texto de que ha ganado*/
						<Fragment>
							<Text style={sg.style.title}>Haz ganado!!</Text>
							<Text style={sg.style.subtitle}>
								Con solo {attemps} intentos restantes!
							</Text>
							<Text style={sg.style.title}>{values.selectedNumber}</Text>
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
							{values.attemps >= 1 ? (
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
										value={values.enteredValue}
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
										El número era {values.chosenNumber}
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

				{values.selectedNumber === values.chosenNumber ? null : (
					// solo mostrar los intentos si no se ha adivinado el número
					<Fragment>
						{values.confirmed ? (
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
