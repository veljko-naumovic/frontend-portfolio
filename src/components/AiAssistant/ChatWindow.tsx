import { useEffect, useState } from "react";
import MessageList from "./MessageList";
import ChatInput from "./ChatInput";
import "./ChatWindow.scss";
import SuggestedQuestions from "./SuggestedQuestions";
import ChatSidebar from "./ChatSidebar";
import { Chat } from "../../types/chat.type";

interface ChatWindowProps {
	onClose: () => void;
}

const initialMessage = {
	role: "assistant" as const,
	content: "Hi! I'm Veljko's AI assistant. Ask me about his experience 🚀",
};

const generateTitle = (text: string) => {
	const t = text.slice(0, 30).trim().replace(/\.$/, "");
	return t ? t.charAt(0).toUpperCase() + t.slice(1) : "New Chat";
};

const ChatWindow: React.FC<ChatWindowProps> = ({ onClose }) => {
	const [chats, setChats] = useState<Chat[]>(() => {
		const saved = localStorage.getItem("chats");
		return saved
			? JSON.parse(saved)
			: [{ id: "1", title: "New Chat", messages: [initialMessage] }];
	});

	const [activeChatId, setActiveChatId] = useState("1");
	const [lastUserMessage, setLastUserMessage] = useState<string | null>(null);
	const [loading, setLoading] = useState(false);
	const [isSidebarOpen, setIsSidebarOpen] = useState(true);

	const activeChat = chats.find((c) => c.id === activeChatId)!;

	useEffect(() => {
		localStorage.setItem("chats", JSON.stringify(chats));
	}, [chats]);

	const sendMessage = async (text: string) => {
		setLastUserMessage(text);
		setLoading(true);

		setChats((prev) =>
			prev.map((chat) => {
				if (chat.id !== activeChatId) return chat;

				const isFirst = chat.messages.length === 1;

				return {
					...chat,
					title: isFirst ? generateTitle(text) : chat.title,
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
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ message: text }),
		});

		const reader = res.body?.getReader();
		const decoder = new TextDecoder();

		let full = "";

		while (true) {
			const { done, value } = await reader!.read();
			if (done) break;

			full += decoder.decode(value);

			setChats((prev) =>
				prev.map((chat) => {
					if (chat.id !== activeChatId) return chat;

					const msgs = [...chat.messages];
					msgs[msgs.length - 1] = {
						role: "assistant",
						content: full,
					};

					return { ...chat, messages: msgs };
				}),
			);
		}

		setLoading(false);
	};

	const regenerate = () => {
		if (!lastUserMessage) return;

		setChats((prev) =>
			prev.map((chat) =>
				chat.id === activeChatId
					? { ...chat, messages: chat.messages.slice(0, -1) }
					: chat,
			),
		);

		sendMessage(lastUserMessage);
	};

	const createNewChat = () => {
		const newChat: Chat = {
			id: Date.now().toString(),
			title: "New Chat",
			messages: [initialMessage],
		};

		setChats((prev) => [newChat, ...prev]);
		setActiveChatId(newChat.id);
	};

	const renameChat = (id: string, title: string) => {
		const t = title.trim();
		setChats((prev) =>
			prev.map((c) =>
				c.id === id ? { ...c, title: t || "New Chat" } : c,
			),
		);
	};

	const deleteChat = (id: string) => {
		setChats((prev) => {
			const updated = prev.filter((c) => c.id !== id);

			if (id === activeChatId) {
				if (updated.length > 0) {
					setActiveChatId(updated[0].id);
				} else {
					const newChat = {
						id: Date.now().toString(),
						title: "New Chat",
						messages: [initialMessage],
					};

					setActiveChatId(newChat.id);
					return [newChat];
				}
			}

			return updated;
		});
	};

	const togglePin = (id: string) => {
		setChats((prev) =>
			prev.map((chat) =>
				chat.id === id ? { ...chat, pinned: !chat.pinned } : chat,
			),
		);
	};

	return (
		<div className="chat-app">
			<ChatSidebar
				chats={chats}
				activeChatId={activeChatId}
				onSelect={setActiveChatId}
				onNewChat={createNewChat}
				onRename={renameChat}
				onDelete={deleteChat}
				onTogglePin={togglePin}
				isOpen={isSidebarOpen}
			/>

			<div className="chat">
				<div className="chat-header">
					<div className="left">
						<button onClick={() => setIsSidebarOpen((p) => !p)}>
							☰
						</button>
					</div>

					<div className="title">🤖 AI Assistant</div>

					<button onClick={onClose}>✕</button>
				</div>

				{activeChat?.messages?.length === 1 && (
					<SuggestedQuestions onSelect={sendMessage} />
				)}

				<MessageList
					messages={activeChat?.messages}
					loading={loading}
					onRegenerate={regenerate}
				/>

				<ChatInput onSend={sendMessage} disabled={loading} />
			</div>
		</div>
	);
};

export default ChatWindow;
