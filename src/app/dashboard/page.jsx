'use client';

import React, { useState, useEffect } from 'react';

import axios from 'axios';
import Img from './Img';

export default function Page({}) {
	const [file, setFile] = useState('');
	const [image, setImage] = useState('');
	const [photo, setPhoto] = useState('');
	const [uploadedImage, setUploadedImage] = useState('');
	const [publicIds, setPublicIds] = useState([]);

	// camera settings
	const constraints = {
		audio: false,
		video: {
			width: 300,
			height: 500,
		},
	};

	const cameraOn = () => {
		navigator.mediaDevices
			.getUserMedia(constraints)
			.then((mediaStream) => {
				const video = document.querySelector('video');
				video.srcObject = mediaStream;
				video.onloadedmetadata = () => {
					video.play();
				};
			})
			.catch((err) => {
				console.error(`${err.name}: ${err.message}`);
			});
	};

	const cameraOff = () => {
		const video = document.querySelector('video');
		const mediaStream = video.srcObject;
		if (mediaStream) {
			const tracks = mediaStream.getTracks();
			tracks.forEach((track) => track.stop());
			video.srcObject = null;
		}
	};

	const takePhoto = (e) => {
		e.preventDefault();
		const video = document.querySelector('video');
		const canvas = document.createElement('canvas');
		canvas.width = video.videoWidth;
		canvas.height = video.videoHeight;
		const context = canvas.getContext('2d');
		context.drawImage(video, 0, 0, canvas.width, canvas.height);
		const dataURL = canvas.toDataURL('image/png');
		setPhoto(dataURL);
		setUploadedImage(dataURL);
	};

	const storePhoto = async () => {
		const photo = uploadedImage;
		const response = await axios.post(
			'http://localhost:2323/uploadToCloudinary',
			{
				photo: photo,
			},
			{
				headers: {
					'Content-Type': 'application/json',
				},
			}
		);
		getPublicIds();
		console.log(response.data);
	};

	// Gets the public_ids from the database when a new photo is stored
	const getPublicIds = async () => {
		const response = await axios.get('http://localhost:2323/getPublicIds');
		console.log(response.data);
	};

	// Gets the public_ids from the database when the component loads
	useEffect(() => {
		getPublicIds();
	}, [photo]);

	return (
		<main>
			<div>Dashboard</div>
			<hr />
			<section>
				<form>
					<div className='center'>
						<video></video>
						<img src={photo} alt={photo} />
					</div>
					<button onClick={takePhoto}>Capture</button>
				</form>
				<button onClick={cameraOn}>Camera On</button>
				<button onClick={cameraOff}>Camera Off</button>
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
				<div className='flex'>
					{publicIds &&
						publicIds.map((pid) => <Img pid={pid.public_id} key={pid.id} />)}
				</div>
			</section>
			<button onClick={storePhoto}>Store</button>
			<button onClick={getPublicIds}>get Ids</button>
		</main>
	);
}
