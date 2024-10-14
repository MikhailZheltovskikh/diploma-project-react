import { API_URL } from '../constans';

export function request(url, method, data) {
	return fetch(`${API_URL}${url}`, {
		headers: {
			'Content-Type': 'application/json',
		},
		method: method || 'GET',
		body: data ? JSON.stringify(data) : undefined,
		credentials: 'include',
	}).then((res) => res.json());
}
