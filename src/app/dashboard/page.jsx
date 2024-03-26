'use client';

import React from 'react';
import styles from './dashboard.module.css';

import axios from 'axios';

export default function Page() {
	async function uploadToCloudinary(blob) {
		const instance = axios.create();

		const data = new FormData();
		data.append('file', blob);
		data.append('cloud_name', 'dqh2jrg9q');
		data.append('upload_preset', 'rjehvjob');

		const res = await instance.post(
			'https://api.cloudinary.com/v1_1/dqh2jrg9q/image/upload/',
			data
		);
	}

	async function videoStream() {
		const video = document.querySelector('video');
		const pictureElement = document.querySelector('.picture');
		const stream = await navigator.mediaDevices.getUserMedia({
			video: true,
			audio: false,
		});

		video.srcObject = stream;
		video.play();
		console.log(stream);

		document.addEventListener('keypress', async (e) => {
			try {
				if (e.code !== 'KeyK') return;

				const canvas = document.createElement('canvas');

				canvas.width = video.videoWidth;
				canvas.height = video.videoHeight;

				canvas
					.getContext('2d')
					.drawImage(video, 0, 0, video.videoWidth, video.videoHeight);

				const blob = await new Promise((resolve) =>
					canvas.toBlob(resolve, 'image/png')
				);

				const imageURL = URL.createObjectURL(blob); // Convert blob to data URL
				pictureElement.src = imageURL;
				uploadToCloudinary(blob);
			} catch (error) {
				console.log(error);
			}
		});
	}

	return (
		<main className={styles.main}>
			<section>
				<div className={styles.justifyCenter}>Dashboard</div>
				<video id='video'></video>
				<picture></picture>
				<img src={null} alt='picture' className='picture' />
				<button className={styles.justifyCenter} onClick={videoStream}>
					Video
				</button>
			</section>
		</main>
	);
}
