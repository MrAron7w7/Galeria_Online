import { View, FlatList } from 'react-native'
import React from 'react'

// Source
import CardImage from './CardImage'

// eslint-disable-next-line react/prop-types
const ImageList = ({ photos }) => {
	const renderItems = ({ item }) => <CardImage image={item} />

	return (
		<View>
			<FlatList
				data={photos}
				renderItem={renderItems}
				keyExtractor={(item) => item.id}
                numColumns={2}
			/>
		</View>
	)
}

export default ImageList
