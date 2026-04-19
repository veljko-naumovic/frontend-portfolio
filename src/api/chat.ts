export const apiFetch = async (url: string, options: RequestInit = {}) => {
	const isBody = options.body !== undefined;

	const res = await fetch(url, {
		...options,
		credentials: "include",
		headers: {
			...(isBody ? { "Content-Type": "application/json" } : {}),
			...(options.headers || {}),
		},
	});

	if (!res.ok) {
		const text = await res.text();
		throw new Error(text || "Request failed");
	}

	return res;
};
