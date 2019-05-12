export function getDate(): string {
	const currentDate = new Date();
	const day = ((currentDate.getDate() < 10) ? '0' : '') + currentDate.getDate();
	const year = currentDate.getFullYear();
	const month = (((currentDate.getMonth() + 1) < 10) ? '0' : '') + (currentDate.getMonth() + 1);
	const dateString = day + '/' + month + '/' + year;
	return dateString;
}

export function getYear(): string {
	const currentDate = new Date();
	const year = currentDate.getFullYear();
	return year + '';
}
