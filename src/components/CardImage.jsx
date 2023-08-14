import { TouchableOpacity, Image, StyleSheet } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'

// eslint-disable-next-line react/prop-types
const CardImage = ({ image }) => {
	// Funciones //
	// Funcion al momento de presionar
	const redireccionar = () => {
		navigation.navigate('ImageScreen', { image })
	}
	// Objeto de navegacion
	const navigation = useNavigation()

	return (
		<TouchableOpacity style={styles.CardImage} onPress={redireccionar}>
			<Image
				source={{
					// eslint-disable-next-line react/prop-types
					uri: image.src.portrait
						? // eslint-disable-next-line react/prop-types
						  image.src.portrait
						: 'https://i1.sndcdn.com/avatars-isQpTzkkjxzRPrxp-yK9v3w-t500x500.jpg',
				}}
				style={{
					height: 180,
					width: 180,
				}}
			/>
		</TouchableOpacity>
	)
}

const styles = StyleSheet.create({
	CardImage: {
		display: 'flex',
		width: '49.5%',
		margin: 4,
		justifyContent: 'space-between',
		backgroundColor: '#2c292c',
		borderWidth: 0,
		borderRadius: 5,
	},
})

export default CardImage
