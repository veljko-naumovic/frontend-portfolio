import { useState } from "react";
import MessageList from "./MessageList";
import ChatInput from "./ChatInput";
import "./ChatWindow.scss";
import { sendMessageApi } from "../../api/chat";

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

		const userMessage = { role: "user" as const, content: text };
		const newMessages = [...messages, userMessage];

		setMessages(newMessages);

		try {
			const data = await sendMessageApi(text);

			setMessages([
				...newMessages,
				{ role: "assistant", content: data.answer },
			]);
		} catch (error) {
			console.log(error);
			setMessages([
				...newMessages,
				{
					role: "assistant",
					content: "Something went wrong...",
				},
			]);
		} finally {
			setLoading(false);
		}
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
