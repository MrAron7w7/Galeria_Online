import React, { useState } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { StatusBar } from 'expo-status-bar'
// Screens
import HomeScreen from './src/screens/HomeScreen'
import ImageScreen from './src/screens/ImageScreen'
import { Image, Text, StyleSheet } from 'react-native'

// Assets
import logo from './assets/logo.png'

const Stack = createNativeStackNavigator()

export default function App() {
	// Funciones //
	// Funcion de buscar
	const buscarImagen = () => {
		setOpenSearch(!openSearch)
	}
	const [openSearch, setOpenSearch] = useState(false)
	return (
		<NavigationContainer>
			<Stack.Navigator>
				<Stack.Screen
					name='HomeScreen'
					options={{
						headerLeft: () => <Image source={logo} style={styles.logo} />, // Le ponemo un logo a la app de inicio
						headerRight: () => (
							<Text style={styles.buscar} onPress={buscarImagen}>
								{openSearch ? 'Cerrar' : 'Buscar'}
							</Text>
						), // Puedes usar return o ()

						title: 'Galery',
						headerStyle: {
							backgroundColor: '#0d0d0d', // Color del header
						},
						headerTintColor: '#fff', // Cambio de color en las letras
						headerTitleStyle: {
							fontWeight: 'bold', // Cambio de diseño
						},
					}}
				>
					{(props) => <HomeScreen {...props} openSearch={openSearch} />}
				</Stack.Screen>
				<Stack.Screen
					name='ImageScreen'
					component={ImageScreen}
					options={{
						title: 'Imagen',
						headerStyle: {
							backgroundColor: '#0d0d0d', // Color del header
						},
						headerTintColor: '#fff', // Cambio de color en las letras
						headerTitleStyle: {
							fontWeight: 'bold', // Cambio de diseño
						},
					}}
				/>
			</Stack.Navigator>
			<StatusBar style='light' />
		</NavigationContainer>
	)
}

const styles = StyleSheet.create({
	logo: {
		width: 37,
		height: 37,
		marginEnd: 5,
		borderRadius: 5,
	},
	buscar: {
		color: '#fff',
		fontSize: 18,
	},
})
