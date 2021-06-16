const whitespace = /\s/g;
const specials = /[\u2000-\u206F\u2E00-\u2E7F\\'!"#$%&()*+,./:;<=>?@[\]^`{|}~’]/g;

export class Slugger {
	private occurrences: Map<string, number>;

	constructor() {
		this.occurrences = new Map();
	}

	_createSlug(string: string, maintainCase?: boolean): string {
		if (!maintainCase) string = string.toLowerCase();
		return string.trim().replace(specials, '').replace(whitespace, '-');
	}

	slug(string: string, maintainCase?: boolean): string {
		if (typeof string !== 'string') return '';

		const slug = this._createSlug(string, maintainCase);
		const count = this.occurrences.get(slug);

		if (typeof count === 'number') {
			const newCount = count + 1;
			this.occurrences.set(slug, newCount);
			return `${slug}-${newCount}`;
		} else {
			this.occurrences.set(slug, 0);
		}

		return slug;
	}

	path(path: string[], maintainCase?: boolean): string {
		const slug = path
			.map((item) => this._createSlug(item, maintainCase))
			.join('/');

		const count = this.occurrences.get(slug);

		if (typeof count === 'number') {
			const newCount = count + 1;
			this.occurrences.set(slug, newCount);
			return `${slug}-${newCount}`;
		} else {
			this.occurrences.set(slug, 0);
		}

		return slug;
	}
}
