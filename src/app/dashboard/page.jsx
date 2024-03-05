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

			document.addEventListener('keypress', async (e) => {
				if (e.code !== 'KeyK') return;

				const canvas = document.createElement('canvas');

				canvas.width = video.videoWidth;
				canvas.height = video.videoHeight;

				canvas
					.getContext('2d')
					.drawImage(video, 0, 0, video.videoWidth, video.videoHeight);

				let img = canvas
					.toDataURL('image/png')
					.replace('data:image/png;base64,', '');
				pictureElement.src = img;

				function chunkString(str, size) {
					const chunks = [];
					for (let i = 0; i < str.length; i += size) {
						chunks.push(str.slice(i, i + size));
					}
					return chunks;
				}

				try {
					const chunkedString = chunkString(img, 1000);
					for (let chunk of chunkedString) {
						const response = await fetch('http://localhost:4000/autosave', {
							method: 'POST',
							headers: {
								'Content-Type': 'text/plain',
							},
							body: chunk,
						});

						if (response.ok) {
							console.log('Image saved successfully');
						} else {
							console.error('Failed to save image');
						}
					}
				} catch (error) {
					console.error('Error saving image: ', error);
				}

				let imageToSave = pictureElement.src;
				imageToSave = 'data:image/png;base64,' + img;
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
