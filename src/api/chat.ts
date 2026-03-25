export interface ChatResponse {
	answer: string;
}

export const sendMessageApi = async (
	message: string,
): Promise<ChatResponse> => {
	const res = await fetch("http://localhost:5000/api/chat", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ message }),
	});

	if (!res.ok) {
		throw new Error("API error");
	}

	return res.json();
};
