import axios from 'axios'

export const getImage = async (searchTerm = 'astro') =>
	await axios.get(`https://api.pexels.com/v1/search?query=${searchTerm}`, {
		headers: {
			Authorization: 'QiEglF9wZzEIVhmb8F1FmQtJof9r7pjbgpjWahuKlldsJsl1d9F8uM64',
		},
	})
