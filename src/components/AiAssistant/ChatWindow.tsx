import { useEffect, useState } from "react";
import MessageList from "./MessageList";
import ChatInput from "./ChatInput";
import "./ChatWindow.scss";
import SuggestedQuestions from "./SuggestedQuestions";

export type Message = {
	role: "user" | "assistant";
	content: string;
};

interface ChatWindowProps {
	onClose: () => void;
}

const ChatWindow: React.FC<ChatWindowProps> = ({ onClose }) => {
	const [messages, setMessages] = useState<Message[]>(() => {
		const saved = localStorage.getItem("chat_history");

		if (saved) {
			return JSON.parse(saved);
		}

		return [
			{
				role: "assistant",
				content:
					"Hi! I'm Veljko's AI assistant. Ask me about his experience 🚀",
			},
		];
	});
	const [lastUserMessage, setLastUserMessage] = useState<string | null>(null);
	const [isResetting, setIsResetting] = useState(false);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		localStorage.setItem("chat_history", JSON.stringify(messages));
	}, [messages]);

	const sendMessage = async (text: string) => {
		setLastUserMessage(text);
		setLoading(true);

		const userMessage = { role: "user" as const, content: text };
		const assistantMessage = { role: "assistant" as const, content: "" };

		setMessages((prev) => [...prev, userMessage, assistantMessage]);

		const res = await fetch(`${import.meta.env.VITE_API_URL}/api/chat`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ message: text }),
		});

		const reader = res.body?.getReader();
		const decoder = new TextDecoder("utf-8");

		if (!reader) return;

		let fullText = "";

		while (true) {
			const { done, value } = await reader.read();
			if (done) break;

			const chunk = decoder.decode(value);
			fullText += chunk;

			setMessages((prev) => {
				const updated = [...prev];
				updated[updated.length - 1] = {
					role: "assistant",
					content: fullText,
				};
				return updated;
			});
		}

		setLoading(false);
	};

	const regenerate = async () => {
		if (!lastUserMessage) return;

		setLoading(true);

		// remove AI answer
		setMessages((prev) => prev.slice(0, -1));

		const assistantMessage = { role: "assistant" as const, content: "" };

		setMessages((prev) => [...prev, assistantMessage]);

		const res = await fetch(`${import.meta.env.VITE_API_URL}/api/chat`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ message: lastUserMessage }),
		});

		const reader = res.body?.getReader();
		const decoder = new TextDecoder("utf-8");

		if (!reader) return;

		let fullText = "";

		while (true) {
			const { done, value } = await reader.read();
			if (done) break;

			const chunk = decoder.decode(value);
			fullText += chunk;

			setMessages((prev) => {
				const updated = [...prev];
				updated[updated.length - 1] = {
					role: "assistant",
					content: fullText,
				};
				return updated;
			});
		}

		setLoading(false);
	};

	const resetChat = () => {
		setIsResetting(true);

		setTimeout(() => {
			const initialMessage = {
				role: "assistant" as const,
				content:
					"Hi! I'm Veljko's AI assistant. Ask me about his experience 🚀",
			};

			setMessages([initialMessage]);
			localStorage.removeItem("chat_history");

			setIsResetting(false);
		}, 250);
	};

	return (
		<div className="chat">
			<div className="chat__header">
				<span>AI Assistant 🤖</span>
				<div className="chat__actions">
					<button onClick={resetChat}>Reset</button>
					<button onClick={onClose}>✕</button>
				</div>
			</div>

			{messages.length === 1 && (
				<SuggestedQuestions onSelect={sendMessage} />
			)}

			<MessageList
				messages={messages}
				loading={loading}
				onRegenerate={regenerate}
				isResetting={isResetting}
			/>

			<ChatInput onSend={sendMessage} disabled={loading} />
		</div>
	);
};

export default ChatWindow;
