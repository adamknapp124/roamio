import React, { useEffect } from 'react';

import { Cloudinary } from '@cloudinary/url-gen';
import { AdvancedImage } from '@cloudinary/react';
import { thumbnail } from '@cloudinary/url-gen/actions/resize';
import { focusOn } from '@cloudinary/url-gen/qualifiers/gravity';
import { face } from '@cloudinary/url-gen/qualifiers/focusOn';
import axios from 'axios';

const Img = ({ pid }) => {
	const cld = new Cloudinary({ cloud: { cloudName: 'roamio' } });
	const myImage = cld.image(pid);
	myImage.resize(thumbnail().width(200).height(200).gravity(focusOn(face())));

	const handleDelete = (e) => {
		e.preventDefault();

		try {
			const result = axios.post('http://localhost:4000/delete-image', {
				image: pid,
			});
			console.log(pid);
		} catch (err) {
			console.log('Error: ', err);
		}
	};

	return (
		<form onSubmit={handleDelete}>
			<AdvancedImage cldImg={myImage} />
			<button>Delete</button>
		</form>
	);
};

export default Img;
