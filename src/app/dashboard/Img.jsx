import React from 'react';

import { Cloudinary } from '@cloudinary/url-gen';
import { AdvancedImage } from '@cloudinary/react';

const Img = ({ pid }) => {
	const cld = new Cloudinary({ cloud: { cloudName: 'roamio' } });
	const myImage = cld.image(pid);
	return (
		<>
			<AdvancedImage cldImg={myImage} />
		</>
	);
};

export default Img;
