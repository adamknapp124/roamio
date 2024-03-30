import axios from 'axios';

export default async function getPublicIds() {
	const result = await axios.get('localhost:3006/get-public-ids');

	try {
		console.log(result);
	} catch (error) {
		console.log(error);
	}
}
