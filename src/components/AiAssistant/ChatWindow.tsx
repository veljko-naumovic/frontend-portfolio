import { useEffect, useState } from "react";
import MessageList from "./MessageList";
import ChatInput from "./ChatInput";
import "./ChatWindow.scss";

export type Message = {
	role: "user" | "assistant";
	content: string;
};

const ChatWindow = ({ onClose }) => {
	const [messages, setMessages] = useState<Message[]>([]);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		setMessages([
			{
				role: "assistant",
				content:
					"Hi! I'm Veljko's AI assistant. Ask me about his experience 🚀",
			},
		]);
	}, []);

	const sendMessage = async (text: string) => {
		const newMessages = [...messages, { role: "user", content: text }];
		setMessages(newMessages);
		setLoading(true);

		const res = await fetch("/api/chat", {
			method: "POST",
			body: JSON.stringify({ message: text }),
			headers: { "Content-Type": "application/json" },
		});

		const data = await res.json();

		setMessages([
			...newMessages,
			{ role: "assistant", content: data.answer },
		]);

		setLoading(false);
	};

	return (
		<div className="chat">
			<div className="chat__header">
				<span>AI Assistant 🤖</span>
				<button onClick={onClose}>✕</button>
			</div>

			<MessageList messages={messages} loading={loading} />

			<ChatInput onSend={sendMessage} disabled={loading} />
		</div>
	);
};

export default ChatWindow;
