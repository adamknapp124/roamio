import React from 'react';

import { Cloudinary } from '@cloudinary/url-gen';
import { AdvancedImage } from '@cloudinary/react';
import { thumbnail, scale } from '@cloudinary/url-gen/actions/resize';
import { focusOn, FocusOn } from '@cloudinary/url-gen/qualifiers/gravity';

const Img = ({ pid }) => {
	const cld = new Cloudinary({ cloud: { cloudName: 'roamio' } });
	const myImage = cld.image(pid);
	myImage.resize(thumbnail().width(200).height(200));
	return (
		<>
			<AdvancedImage cldImg={myImage} />
		</>
	);
};

export default Img;
