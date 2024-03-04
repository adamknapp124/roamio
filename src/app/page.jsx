'use client';

import Image from 'next/image';
import styles from './page.module.css';

import map from '../../public/images/google-map.png';

export default function Home() {
	return (
		<main className={styles.main}>
			<section className={styles.container}>
				<Image
					className={styles.image}
					src={map}
					alt='map'
					width={500}
					height={500}
					priority
				/>
			</section>
			<section className={styles.container}>
				<button>
					<a href='/dashboard'>Dashboard</a>
				</button>
			</section>
		</main>
	);
}
