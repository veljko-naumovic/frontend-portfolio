import { useEffect, useState } from "react";
import MessageList from "./MessageList";
import ChatInput from "./ChatInput";
import "./ChatWindow.scss";
import SuggestedQuestions from "./SuggestedQuestions";
import ChatSidebar from "./ChatSidebar";

export type Message = {
	role: "user" | "assistant";
	content: string;
};

type Chat = {
	id: string;
	title: string;
	messages: Message[];
};

interface ChatWindowProps {
	onClose: () => void;
}

const initialMessage = {
	role: "assistant" as const,
	content: "Hi! I'm Veljko's AI assistant. Ask me about his experience 🚀",
};

const ChatWindow: React.FC<ChatWindowProps> = ({ onClose }) => {
	const [chats, setChats] = useState<Chat[]>(() => {
		const saved = localStorage.getItem("chats");

		if (saved) return JSON.parse(saved);

		return [
			{
				id: "1",
				title: "New Chat",
				messages: [initialMessage],
			},
		];
	});

	const [activeChatId, setActiveChatId] = useState("1");
	const [lastUserMessage, setLastUserMessage] = useState<string | null>(null);
	const [loading, setLoading] = useState(false);

	const activeChat = chats.find((c) => c.id === activeChatId);

	useEffect(() => {
		localStorage.setItem("chats", JSON.stringify(chats));
	}, [chats]);

	//  SEND MESSAGE
	const sendMessage = async (text: string) => {
		setLastUserMessage(text);
		setLoading(true);

		setChats((prev) =>
			prev.map((chat) => {
				if (chat.id !== activeChatId) return chat;

				return {
					...chat,
					messages: [
						...chat.messages,
						{ role: "user", content: text },
						{ role: "assistant", content: "" },
					],
				};
			}),
		);

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

			setChats((prev) =>
				prev.map((chat) => {
					if (chat.id !== activeChatId) return chat;

					const updatedMessages = [...chat.messages];
					updatedMessages[updatedMessages.length - 1] = {
						role: "assistant",
						content: fullText,
					};

					return { ...chat, messages: updatedMessages };
				}),
			);
		}

		setLoading(false);
	};

	// REGENERATE
	const regenerate = async () => {
		if (!lastUserMessage) return;

		setLoading(true);

		setChats((prev) =>
			prev.map((chat) => {
				if (chat.id !== activeChatId) return chat;

				return {
					...chat,
					messages: chat.messages.slice(0, -1),
				};
			}),
		);

		sendMessage(lastUserMessage);
	};

	//  NEW CHAT
	const createNewChat = () => {
		const newChat: Chat = {
			id: Date.now().toString(),
			title: "New Chat",
			messages: [initialMessage],
		};

		setChats((prev) => [newChat, ...prev]);
		setActiveChatId(newChat.id);
	};

	return (
		<div className="chat-app">
			<ChatSidebar
				chats={chats}
				activeChatId={activeChatId}
				onSelect={setActiveChatId}
				onNewChat={createNewChat}
			/>

			{/* 🔥 MAIN CHAT */}
			<div className="chat">
				<div className="chat__header">
					<span>AI Assistant 🤖</span>
					<button onClick={onClose}>✕</button>
				</div>

				{activeChat?.messages.length === 1 && (
					<SuggestedQuestions onSelect={sendMessage} />
				)}

				<MessageList
					messages={activeChat?.messages || []}
					loading={loading}
					onRegenerate={regenerate}
				/>

				<ChatInput onSend={sendMessage} disabled={loading} />
			</div>
		</div>
	);
};

export default ChatWindow;
