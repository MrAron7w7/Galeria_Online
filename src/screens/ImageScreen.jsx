import { View, Image, StyleSheet, Text, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Avatar, Button } from '@rneui/themed'
import * as WebBrowser from 'expo-web-browser'
import ImageList from '../components/ImageList'
import { getImage } from '../api/pexels'
import * as fileSystem from 'expo-file-system'
import * as MediaLibrary from 'expo-media-library'

const ImageScreen = ({ route }) => {
	const { image } = route.params
	const [photos, setPhotos] = useState([])
	const loadImagens = async () => {
		const rest = await getImage()
		setPhotos(rest.data.photos)
	}
	const handlePress = async () => {
		await WebBrowser.openAuthSessionAsync(image.photographer_url)
	}
	useEffect(() => {
		loadImagens()
	}, [])

	useEffect(() => {}, [])

	const handleDownload = () => {
		downloadFile()
	}
	const saveFile = async (fileUri) => {
		const { status } = await MediaLibrary.requestPermissionsAsync()

		if (status === 'granted') {
			const asset = await MediaLibrary.createAssetAsync(fileUri) // Crea el archivo o guarda el archivo en esta direccion

			await MediaLibrary.createAlbumAsync('Download', asset, false)
		}
	}
	const downloadFile = async () => {
		try {
			let fileUri = fileSystem.documentDirectory + image.id + '.jpeg'
			const { uri } = await fileSystem.downloadAsync(image.src.large2x, fileUri)
			saveFile(uri)
		} catch (error) {
			console.error(error)
		}
	}
	return (
		<View style={styles.containerPhotographer}>
			<Image source={{ uri: image.src.large2x }} style={styles.image} />
			<View
				style={{
					display: 'flex',
					paddingVertical: 18,
					justifyContent: 'space-between',
					flexDirection: 'row',
					alignItems: 'center',
					width: '100%',
				}}
			>
				<View style={styles.containerAvatar}>
					<Avatar
						title={image.photographer
							.split(' ')
							.map((name) => name[0])
							.join('')
							.toUpperCase()}
						containerStyle={styles.avatar}
						rounded
					/>
					<TouchableOpacity onPress={handlePress}>
						<Text style={styles.textPhotographer}>{image.photographer}</Text>
					</TouchableOpacity>
				</View>
				<Button
					title={'Descargar'}
					buttonStyle={{ backgroundColor: '#228793' }}
					onPress={() => handleDownload()}
					style={{
						height: 50,
					}}
				/>
			</View>
			<View>
				<Text style={styles.recomendacion}>
					Recomendación pvto quien lo lea >:v
				</Text>
				<ImageList photos={photos} />
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},
	image: {
		height: 350,
	},
	containerAvatar: {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
	},
	avatar: {
		backgroundColor: '#228793',
	},
	containerPhotographer: {
		backgroundColor: '#0D0D0D',
		flex: 1,
		flexDirection: 'column',
		padding: 10,
	},
	textPhotographer: {
		color: '#fff',
		fontWeight: 'bold',
		marginStart: 10,
		fontSize: 18,
	},
	recomendacion: {
		color: '#fff',
		marginVertical: 10,
	},
})

export default ImageScreen
