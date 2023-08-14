import { View, StyleSheet, Text } from 'react-native'
import React, { useEffect, useState } from 'react'

import { Input, Button } from '@rneui/themed'

// Source
import { getImage } from '../api/pexels'
import ImageList from '../components/ImageList'

const HomeScreen = ({ openSearch }) => {
	const [photos, setPhotos] = useState([])
	const [searchTerm, setSearchTerm] = useState('')
	const loadImagens = async (searchTerm) => {
		const rest = await getImage(searchTerm)
		console.log(rest.headers)
		setPhotos(rest.data.photos)
	}
	useEffect(() => {
		loadImagens()
	}, [])

	// Funciones //
	const handleSearch = async () => {
		await loadImagens(searchTerm)
	}
	return (
		<>
			{openSearch && ( // SI esta en True pinte o has esto
				<View style={styles.contenedorBusqueda}>
					<Input
						leftIcon={{ type: 'material', name: 'search', color: '#fcfcfc' }}
						placeholder='Nombre a buscar'
						style={styles.input}
						inputContainerstyle={styles.estiloInput}
						onChangeText={(value) => setSearchTerm(value)}
					/>
					<Button
						title='Buscar'
						buttonStyle={styles.estiloButon}
						onPress={() => handleSearch()}
					/>
				</View>
			)}
			<View style={styles.container}>
				<Text style={styles.totalResulText}>{getImage.photographer_id} Resultados</Text>
				<ImageList photos={photos} />
			</View>
		</>
	)
}
const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#0D0D0D',
		alignItems: 'center',
		justifyContent: 'center',
	},
	totalResulText: {
		textAlign: 'center',
		color: '#D0D0D0',
		paddingTop: 35,
		width: '100%',
	},
	estiloInput: {
		backgroundColor: '#2c292c',
		borderBottomWidth: 0,
		paddingHorizontal: 4,
		color: 'white',
	},
	contenedorBusqueda: {
		backgroundColor: '#2c292c',
		width: '100%',
		paddingLeft: 10,
		paddingRight: 80,
		flex: 1 / 6,
		flexDirection: 'row',
		alignItems: 'center',
	},
	estiloButon: {
		backgroundColor: '#229783',
		marginBottom: 12,
	},
	input: {
		color: '#fcfcfc',
	},
})
export default HomeScreen
