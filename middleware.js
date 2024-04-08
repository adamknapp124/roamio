import { NextResponse } from 'next/server';

const allowedOrigins =
	process.env.NODE_ENV === 'production'
		? 'https://roamio-rho.vercel.app'
		: 'http://localhost:3000';

export function middleware() {
	const origin = request.headers.get('origin');
	console.log(origin);

	if (origin && !allowedOrigins.includes(origin)) {
		return new NextResponse(null, {
			status: 400,
			statusText: 'Bad Request',
			headers: {
				'Content-Type': 'text/plain',
			},
		});
	}
}
