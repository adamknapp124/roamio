import React from 'react';

import { Cloudinary } from '@cloudinary/url-gen';

const Img = () => {
	const cld = new Cloudinary({ cloud: { cloudName: 'roamio' } });
	return <img></img>;
};

export default Img;
