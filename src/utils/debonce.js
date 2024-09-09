export const debonce = (fn, delay) => {
	let timeoutId;

	return (...args) => {
		clearTimeout(timeoutId)
		timeoutId = setTimeout(fn, delay, ...args);
	}
}