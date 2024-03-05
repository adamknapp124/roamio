'use client';

import React from 'react';
import picture from '../../../public/images/google-map.png';

export default function Page() {
	async function videoStream() {
		const video = document.querySelector('video');
		const pictureElement = document.querySelector('.picture');
		try {
			const stream = await navigator.mediaDevices.getUserMedia({
				video: {
					width: 400,
					height: 200,
				},
				audio: false,
			});

			video.srcObject = stream;
			video.play();
			console.log(stream);

			document.addEventListener('keypress', (e) => {
				if (e.code !== 'KeyK') return;

				const canvas = document.createElement('canvas');

				canvas.width = video.videoWidth;
				canvas.height = video.videoHeight;

				canvas
					.getContext('2d')
					.drawImage(video, 0, 0, video.videoWidth, video.videoHeight);

				let imgData = canvas
					.toDataURL('image/png')
					.replace('image/png', 'image/octet-stream');

				pictureElement.src = imgData;
			});
		} catch (error) {
			console.log(error);
		}
	}

	return (
		<main>
			<section>
				<div>Dashboard</div>
				<video id='video'></video>
				<img src={null} alt='picture' className='picture' />
				<button onClick={videoStream}>Video</button>
			</section>
		</main>
	);
}
