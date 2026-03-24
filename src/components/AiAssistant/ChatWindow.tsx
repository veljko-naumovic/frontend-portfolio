import { useState } from "react";
import MessageList from "./MessageList";
import ChatInput from "./ChatInput";
import "./ChatWindow.scss";

export type Message = {
	role: "user" | "assistant";
	content: string;
};

interface ChatWindowProps {
	onClose: () => void;
}

const ChatWindow: React.FC<ChatWindowProps> = ({ onClose }) => {
	const [messages, setMessages] = useState<Message[]>([
		{
			role: "assistant",
			content:
				"Hi! I'm Veljko's AI assistant. Ask me about his experience 🚀",
		},
	]);
	const [loading, setLoading] = useState(false);

	const sendMessage = async (text: string) => {
		setLoading(true);

		setMessages((prev) => [...prev, { role: "user", content: text }]);

		const res = await fetch("/api/chat", {
			method: "POST",
			body: JSON.stringify({ message: text }),
			headers: { "Content-Type": "application/json" },
		});

		const data = await res.json();

		setMessages((prev) => [
			...prev,
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
