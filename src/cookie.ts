export const cookie = {
	set: (name: string, value: string, expiredInDays?: number, path?: string): void => {
		expiredInDays ??= 7;

		let date = new Date();
		date.setTime(date.getTime() + expiredInDays * 24 * 60 * 60 * 1000);
		const optExpires = `expires=${date.toUTCString()};`;
		const optSamesite = `samesite=strict;`;
		const optPath = `path=${path || window.location.hostname};`;
		const optValue = `${name}=${value};`;

		document.cookie = `${optValue}${optExpires}${optSamesite}${optPath}`;
	},
	delete: (name: string): void => {
		cookie.set(name, "", -1);
	},
	get: (name: string): string | null => {
		name = `${name}=`;
		const cDecoded = decodeURIComponent(document.cookie);
		const cArr = cDecoded.split("; ");
		let res: string | null = null;
		cArr.forEach((val) => {
			if (val.indexOf(name) === 0) res = val.substring(name.length);
		});
		return res;
	},
};
