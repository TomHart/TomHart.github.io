const levels = [
	'.00', 'k', 'M', 'B', 'T'
];

for (let i = 0; i < 26; i++) {
	const char = String.fromCharCode(65 + i);
	levels.push(char + char);
}

for (let i = 0; i < 26; i++) {
	const char = String.fromCharCode(65 + i);
	levels.push(char + char + char);
}

export default {
	'ad-com': {
		routeName: 'ad-com',
		name: 'Adventure Communist',
		levels: levels
	}
}