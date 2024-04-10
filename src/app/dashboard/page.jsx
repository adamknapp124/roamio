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

	// Turns the camera on
	const cameraOn = () => {
		navigator.mediaDevices
			.getUserMedia(constraints)
			// Creates the mediaStream
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

	// Turns the camera off
	const cameraOff = () => {
		const video = document.querySelector('video');
		const mediaStream = video.srcObject;
		if (mediaStream) {
			const tracks = mediaStream.getTracks();
			tracks.forEach((track) => track.stop());
			video.srcObject = null;
		}
	};

	const takePhoto = () => {
		const video = document.querySelector('video');
		const canvas = document.createElement('canvas');
		canvas.width = video.videoWidth;
		canvas.height = video.videoHeight;
		const context = canvas.getContext('2d');
		context.drawImage(video, 0, 0, canvas.width, canvas.height);
		const dataURL = canvas.toDataURL('image/png');
		setPhoto(dataURL);
		console.log('photo: ', dataURL);
	};

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

		try {
			const result = await axios.post(
				'https://https://roamio-backend.vercel.app/',
				{
					image: image,
				}
			);
			const uploadedImage = result.data.public_id;
			setUploadedImage(uploadedImage);
			await axios.post('https://https://roamio-backend.vercel.app/add-photo', {
				public_id: uploadedImage,
			});
		} catch (err) {
			console.log('Error: ', err);
		}
		setUploadedImage('');
	};

	const submitCameraPhoto = async (e) => {
		e.preventDefault();

		try {
			const result = await axios.post('/', {
				image: photo,
			});
			const uploadedImage = result.data.public_id;
			setUploadedImage(uploadedImage),
				await axios.post('https://https://roamio-backend.vercel.app/add-photo/', {
					public_id: uploadedImage,
				});
		} catch (err) {
			console.log('Error: ', err);
		}
		setUploadedImage('');
	};

	useEffect(() => {
		// get public ids from database
		const getPublicIds = async () => {
			try {
				const result = await axios.get(
					'https://https://roamio-backend.vercel.app/get-public-ids'
				);
				const public_ids = result.data;
				setPublicIds(public_ids);
			} catch (error) {
				console.log(error);
			}
			setImage('');
		};

		getPublicIds(); // Call the getPublicIds function
	}, [uploadedImage]);

	return (
		<main>
			<div>Dashboard</div>
			<hr />
			<section>
				<form onSubmit={submitCameraPhoto}>
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
		</main>
	);
}
