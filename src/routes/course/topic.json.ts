import type { RequestHandler } from '@sveltejs/kit';

export const get: RequestHandler = () => {
	const algebra = {
		id: '69a1dfae-7f72-4a19-909b-8a5dd1101fb0',
		name: 'Algebra',
		topic: [
			{
				title: 'Algebra Foundation',
				id: 'fa3202c7-921c-4bbb-b1bc-6ae5f92b4dfb',
				topics: [
					{
						title: 'Overview and history of algebra',
						parent_id: 'fa3202c7-921c-4bbb-b1bc-6ae5f92b4dfb',
						video: null
					},
					{ title: 'Introduction to variables', parent_id: 'fa3202c7-921c-4bbb-b1bc-6ae5f92b4dfb' },
					{ title: 'Substitution and evaluating expressions' },
					{ title: 'Combining like terms' },
					{ title: 'Introduction to equivalent expressions' },
					{ title: 'Division by zero' }
				]
			},
			{
				title: 'Solving equations & inequalities',
				id: '8dc0a85e-3c5f-4c69-821e-f8f25b1ac102',
				topics: [
					{ title: 'Overview and history of algebra' },
					{ title: 'Introduction to variables' },
					{ title: 'Substitution and evaluating expressions' },
					{ title: 'Combining like terms' },
					{ title: 'Introduction to equivalent expressions' },
					{ title: 'Division by zero' }
				]
			},
			{
				title: 'Working with units',
				id: '9ebe8cd6-7dde-4e3c-b9ac-23cd898bd28f',
				topics: [
					{ title: 'Overview and history of algebra' },
					{ title: 'Introduction to variables' },
					{ title: 'Substitution and evaluating expressions' },
					{ title: 'Combining like terms' },
					{ title: 'Introduction to equivalent expressions' },
					{ title: 'Division by zero' }
				]
			},
			{
				title: 'Linear equations & graphs',
				id: '964ba0e1-f0de-4662-b54f-eb779fe638a4',
				topics: [
					{ title: 'Overview and history of algebra' },
					{ title: 'Introduction to variables' },
					{ title: 'Substitution and evaluating expressions' },
					{ title: 'Combining like terms' },
					{ title: 'Introduction to equivalent expressions' },
					{ title: 'Division by zero' }
				]
			},
			{
				title: 'Systems of equations',
				id: 'e92c8fb4-c270-4ab4-9b1d-1e03fd705001',
				topics: [
					{ title: 'Overview and history of algebra' },
					{ title: 'Introduction to variables' },
					{ title: 'Substitution and evaluating expressions' },
					{ title: 'Combining like terms' },
					{ title: 'Introduction to equivalent expressions' },
					{ title: 'Division by zero' }
				]
			},
			{
				title: 'Inequalities (systems & graphs)',
				id: '407a4ed9-d05c-4458-9ef4-3f631fcdb14a',
				topics: [
					{ title: 'Overview and history of algebra' },
					{ title: 'Introduction to variables' },
					{ title: 'Substitution and evaluating expressions' },
					{ title: 'Combining like terms' },
					{ title: 'Introduction to equivalent expressions' },
					{ title: 'Division by zero' }
				]
			}
		]
	};

	return {
		body: algebra
	};
};
