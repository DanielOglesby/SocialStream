export function trimURL(url: string) {
	const regExp = /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
	const match = url.match(regExp);
	if (match && match[2].length == 11) {
		console.log('trimmed url', match[2]);
		return match[2];
	} else {
		console.log('error trimming url');
	}
}
