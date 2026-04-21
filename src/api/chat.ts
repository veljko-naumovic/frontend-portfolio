export const apiFetch = async (url: string, options: RequestInit = {}) => {
	let userId = localStorage.getItem("userId");

	if (!userId) {
		userId = crypto.randomUUID();
		localStorage.setItem("userId", userId);
	}

	const isBody = options.body !== undefined;

	const res = await fetch(url, {
		...options,
		credentials: "include",
		headers: {
			...(isBody ? { "Content-Type": "application/json" } : {}),
			"x-user-id": userId,
			...(options.headers || {}),
		},
	});

	if (!res.ok) {
		const text = await res.text();
		throw new Error(text || "Request failed");
	}

	return res;
};
