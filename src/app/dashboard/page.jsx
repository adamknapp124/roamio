'use client';

import React, { useState, useEffect } from 'react';

import axios from 'axios';
import getPublicIds from '../libs/getPublicIds';

export default function Page({}) {
	const [file, setFile] = useState('');
	const [image, setImage] = useState('');
	const [uploadedImage, setUploadedImage] = useState('');

	function previewFiles(file) {
		// instantiate reader to asynchronously read contents of files
		const reader = new FileReader();
		reader.readAsDataURL(file);

		reader.onloadend = () => {
			setImage(reader.result);
		};
	}

	const handleChange = (e) => {
		const file = e.target.files[0];
		setFile(file);
		previewFiles(file);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		const result = await axios.post('http://localhost:4000/', {
			image: image,
		});

		try {
			const uploadedImage = result.data.public_id;
			setUploadedImage(uploadedImage);
			await axios.post('http://localhost:4000/add-photo', {
				public_id: uploadedImage,
			});
		} catch (err) {
			console.log('Error: ', err);
		}
	};

	// get public ids from database
	const getPublicIds = async () => {
		const result = await axios.get('http://localhost:4000/get-public-ids');

		try {
			const public_ids = result.data;
			console.log(public_ids);
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		getPublicIds();
	}, [getPublicIds]);

	return (
		<main>
			<section>
				<div>Dashboard</div>
				<video id='video'></video>
				<picture></picture>
				<hr />
				<img src={null} alt='picture' />
				<button>Enable Camera</button>
				<span>Press 'K' to take photo</span>
			</section>
			<section>
				{/* Dont forget to build forms when you need to submit information */}
				<form onSubmit={(e) => handleSubmit(e)}>
					<label htmlFor='fileInput'>Upload Photo</label>
					<input
						type='file'
						id='fileInput'
						onChange={(e) => handleChange(e)}
						required
						accept='image/png, image/jpeg, image/jpg, image/jfif'
					/>
					<button>Submit</button>
				</form>
			</section>
			<section>
				<img src={image} alt='' />
			</section>
		</main>
	);
}
