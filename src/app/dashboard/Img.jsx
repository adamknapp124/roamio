import React from 'react';

import { Cloudinary } from '@cloudinary/url-gen';
import { AdvancedImage } from '@cloudinary/react';
import { thumbnail } from '@cloudinary/url-gen/actions/resize';
import { focusOn } from '@cloudinary/url-gen/qualifiers/gravity';
import { face } from '@cloudinary/url-gen/qualifiers/focusOn';

const Img = ({ pid }) => {
	const cld = new Cloudinary({ cloud: { cloudName: 'roamio' } });
	const myImage = cld.image(pid);
	myImage.resize(thumbnail().width(200).height(200).gravity(focusOn(face())));
	return (
		<>
			<AdvancedImage cldImg={myImage} />
		</>
	);
};

export default Img;
