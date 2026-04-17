import { useEffect, useRef, useState } from "react";
import MessageList from "./MessageList";
import ChatInput from "./ChatInput";
import "./ChatWindow.scss";
import ChatSidebar from "./ChatSidebar";
import { Chat } from "../../types/chat.type";
import EmptyState from "./EmptyState";
import ChatSuggestions from "./ChatSuggestions";
import { LuPanelLeft } from "react-icons/lu";

interface ChatWindowProps {
	onClose: () => void;
}

const generateTitle = (text: string) => {
	const t = text.slice(0, 30).trim().replace(/\.$/, "");
	return t ? t.charAt(0).toUpperCase() + t.slice(1) : "New Chat";
};

const ChatWindow: React.FC<ChatWindowProps> = ({ onClose }) => {
	const [chats, setChats] = useState<Chat[]>([]);
	const [activeChatId, setActiveChatId] = useState<string | null>(null);
	const [lastUserMessage, setLastUserMessage] = useState<string | null>(null);
	const [loading, setLoading] = useState(false);
	const [isSidebarOpen, setIsSidebarOpen] = useState(true);

	const bottomRef = useRef<HTMLDivElement | null>(null);

	const activeChat = chats.find((c) => c.id === activeChatId);

	useEffect(() => {
		const loadChats = async () => {
			const res = await fetch(`${import.meta.env.VITE_API_URL}/api/chat`);
			const data = await res.json();

			const mapped = data.map((c: { _id: string }) => ({
				...c,
				id: c._id,
			}));

			setChats(mapped);

			if (mapped.length > 0) {
				setActiveChatId(mapped[0].id);
			}
		};

		loadChats();
	}, []);

	//  suggestions
	const fetchSuggestions = async (
		message: string,
		answer: string,
		chatId: string,
	) => {
		const res = await fetch(
			`${import.meta.env.VITE_API_URL}/api/chat/suggestions`,
			{
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ message, answer }),
			},
		);

		const data = await res.json();

		setChats((prev) =>
			prev.map((chat) =>
				chat.id === chatId
					? { ...chat, suggestions: data.suggestions || [] }
					: chat,
			),
		);
	};

	const sendMessage = async (text: string) => {
		if (!activeChatId) return;

		setLastUserMessage(text);
		setLoading(true);

		// the newest chat from state
		const currentChat = chats.find((c) => c.id === activeChatId);
		if (!currentChat) return;

		const isFirst = currentChat.messages.length === 1;
		const newTitle = isFirst ? generateTitle(text) : currentChat.title;

		// if message is the first → rename backend
		if (isFirst) {
			try {
				await fetch(`${import.meta.env.VITE_API_URL}/api/chat/rename`, {
					method: "PATCH",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({
						chatId: activeChatId,
						title: newTitle,
					}),
				});
			} catch (err) {
				console.error("Rename failed", err);
			}
		}

		// instant UI update
		setChats((prev) =>
			prev.map((chat) => {
				if (chat.id !== activeChatId) return chat;

				return {
					...chat,
					title: newTitle,
					messages: [
						...chat.messages,
						{ role: "user", content: text },
						{ role: "assistant", content: "" },
					],
				};
			}),
		);

		// AI request
		const res = await fetch(`${import.meta.env.VITE_API_URL}/api/chat`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				message: text,
				chatId: activeChatId,
			}),
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

		// suggestions
		fetchSuggestions(text, full, activeChatId);
	};

	//  regenerate
	const regenerate = () => {
		if (!lastUserMessage || !activeChatId) return;

		setChats((prev) =>
			prev.map((chat) =>
				chat.id === activeChatId
					? { ...chat, messages: chat.messages.slice(0, -1) }
					: chat,
			),
		);

		sendMessage(lastUserMessage);
	};

	//  CREATE CHAT
	const createNewChat = async () => {
		const res = await fetch(
			`${import.meta.env.VITE_API_URL}/api/chat/create`,
			{ method: "POST" },
		);

		const newChat = await res.json();

		const mapped = {
			...newChat,
			id: newChat._id,
		};

		setChats((prev) => [mapped, ...prev]);
		setActiveChatId(mapped.id);
	};

	//  rename
	const renameChat = async (id: string, title: string) => {
		const t = title.trim() || "New Chat";

		// update backend
		await fetch(`${import.meta.env.VITE_API_URL}/api/chat/rename`, {
			method: "PATCH",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				chatId: id,
				title: t,
			}),
		});

		// update frontend
		setChats((prev) =>
			prev.map((c) => (c.id === id ? { ...c, title: t } : c)),
		);
	};

	//  delete
	const deleteChat = async (id: string) => {
		try {
			await fetch(`${import.meta.env.VITE_API_URL}/api/chat/${id}`, {
				method: "DELETE",
			});

			setChats((prev) => {
				const updated = prev.filter((c) => c.id !== id);

				// if delete active chat
				if (id === activeChatId) {
					setActiveChatId(updated[0]?.id || null);
				}

				return updated;
			});
		} catch (err) {
			console.error("Delete failed", err);
		}
	};

	//  pin
	const togglePin = async (id: string) => {
		const chat = chats.find((c) => c.id === id);
		if (!chat) return;

		const newPinned = !chat.pinned;

		try {
			await fetch(`${import.meta.env.VITE_API_URL}/api/chat/pin`, {
				method: "PATCH",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					chatId: id,
					pinned: newPinned,
				}),
			});

			setChats((prev) =>
				prev.map((c) =>
					c.id === id ? { ...c, pinned: newPinned } : c,
				),
			);
		} catch (err) {
			console.error("Pin failed", err);
		}
	};

	useEffect(() => {
		bottomRef.current?.scrollIntoView({ behavior: "smooth" });
	}, [activeChat?.messages]);

	return (
		<div className="chat-app">
			<ChatSidebar
				chats={chats}
				activeChatId={activeChatId || ""}
				onSelect={setActiveChatId}
				onNewChat={createNewChat}
				onRename={renameChat}
				onDelete={deleteChat}
				onTogglePin={togglePin}
				isOpen={isSidebarOpen}
			/>

			{isSidebarOpen && (
				<div
					className="chat-overlay"
					onClick={() => setIsSidebarOpen(false)}
				/>
			)}

			<div className="chat">
				<div className="chat-header">
					<div className="left">
						<button
							onClick={() => setIsSidebarOpen((p) => !p)}
							className="toggle-btn"
						>
							<LuPanelLeft
								className={`toggle-icon ${
									!isSidebarOpen ? "closed" : ""
								}`}
							/>
						</button>
					</div>

					<div className="title">🤖 AI Assistant</div>

					<button onClick={onClose}>✕</button>
				</div>

				{activeChat?.messages?.length === 1 && (
					<EmptyState onSelect={sendMessage} />
				)}

				<MessageList
					messages={activeChat?.messages}
					loading={loading}
					onRegenerate={regenerate}
				/>

				<div ref={bottomRef} />

				<ChatSuggestions
					suggestions={activeChat?.suggestions || []}
					onSelect={sendMessage}
				/>

				<ChatInput onSend={sendMessage} disabled={loading} />
			</div>
		</div>
	);
};

export default ChatWindow;
