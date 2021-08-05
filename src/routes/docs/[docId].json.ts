import type { RequestHandler } from '@sveltejs/kit';
import { google } from 'googleapis';

export const get: RequestHandler = async ({ params }) => {
	const { docId } = params;
	const docs = google.docs({
		version: 'v1',
		headers: {
			authorization:
				// 'Bearer ya29.a0AfH6SMAqXMAjH8M3TDdS8iHU_s82t7aXX-fVl8FkSn_DLA0AHcL5x6PglaNtMOFU4nHrVhqS7JpBuxFjOpXlb0G5qnHw4Moc6FCN5vEOmQC2e8JChEZS0wFpjbWtVFwdIwLDrPwU88Fm5RGSHEfReLJV2Bpu'
				'Bearer ya29.a0ARrdaM9rQwyJ9ziARmzYxL_-T9ZQX0ypVXuRaysbQ0dz0_qXCSNkkvlh99R7yLIr6XTm2TwpqRYAe78fzPPDvAW_xgEZRqoIky2eHJUUlgmkgkIDvi_XOb0AM-xkl9W0qUlnKjQX8tJRb_i7nFOo8VJKggkL'
		}
	});

	docs.documents.get(
		{
			documentId: '1UoXPFXbdX_k9c44a5vUGJdpWzoq6CXB0RdOV62qPt3A'
		},
		(err, res) => {
			console.log(err);
			if (err) return console.log('The API returned an error: ' + err);
			console.log(`The title of the document is: ${res.data.title}`);
		}
	);

	return {
		body: { docId }
	};
};
