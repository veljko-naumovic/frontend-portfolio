import { useEffect, useRef, useState } from "react";
import MessageList from "./MessageList";
import ChatInput from "./ChatInput";
import "./ChatWindow.scss";
import ChatSidebar from "./ChatSidebar";
import { Chat } from "../../types/chat.type";
import EmptyState from "./EmptyState";
import ChatSuggestions from "./ChatSuggestions";
import { LuPanelLeft } from "react-icons/lu";
import { apiFetch } from "../../api/chat";

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
	const [suggestionsLoading, setSuggestionsLoading] = useState(false);

	const bottomRef = useRef<HTMLDivElement | null>(null);

	const activeChat = chats.find((c) => c.id === activeChatId);

	useEffect(() => {
		const loadChats = async () => {
			const res = await apiFetch(
				`${import.meta.env.VITE_AI_API}/api/chat`,
			);
			const data = await res.json();

			const mapped = data.map((c: { _id: string }) => ({
				...c,
				id: c._id,
			}));

			if (mapped.length > 0) {
				setChats(mapped);

				const firstChat = mapped[0];
				setActiveChatId(firstChat.id);

				// trigger suggestions
				const msgs = firstChat.messages;

				if (msgs && msgs.length >= 2) {
					const lastAssistant = msgs[msgs.length - 1];
					const lastUser = msgs[msgs.length - 2];

					if (
						lastAssistant.role === "assistant" &&
						lastAssistant.content &&
						lastUser.role === "user" &&
						!firstChat.suggestions?.length
					) {
						setSuggestionsLoading(true);

						await fetchSuggestions(
							lastUser.content,
							lastAssistant.content,
							firstChat.id,
						);
					}
				}
			} else {
				const res = await apiFetch(
					`${import.meta.env.VITE_AI_API}/api/chat/create`,
					{ method: "POST" },
				);

				const newChat = await res.json();

				const mappedChat = {
					...newChat,
					id: newChat._id,
				};

				setChats([mappedChat]);
				setActiveChatId(mappedChat.id);
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
		setSuggestionsLoading(true);

		try {
			const res = await apiFetch(
				`${import.meta.env.VITE_AI_API}/api/chat/suggestions`,
				{
					method: "POST",
					body: JSON.stringify({ message, answer }),
				},
			);

			const data = await res.json();

			setChats((prev) =>
				prev.map((chat) => {
					if (chat.id !== chatId) return chat;

					const existingMessages = chat.messages.map((m) =>
						m.content.toLowerCase(),
					);

					const isDuplicate = (s: string) =>
						existingMessages.some((m) =>
							m.includes(s.toLowerCase().slice(0, 20)),
						);

					const isBadSuggestion = (s: string) =>
						["context", "cannot engage"].some((b) =>
							s.toLowerCase().includes(b),
						);

					let uniqueSuggestions = (data.suggestions || [])
						.filter((s: string) => !isBadSuggestion(s))
						.filter((s: string) => !isDuplicate(s));

					if (uniqueSuggestions.length === 0) {
						uniqueSuggestions = data.suggestions || [];
					}

					return {
						...chat,
						suggestions: uniqueSuggestions.slice(0, 3),
					};
				}),
			);
		} catch (err) {
			console.error(err);
		} finally {
			setSuggestionsLoading(false);
		}
	};

	const sendMessage = async (text: string) => {
		if (!activeChatId) return;

		setLastUserMessage(text);
		setLoading(true);

		try {
			const currentChat = chats.find((c) => c.id === activeChatId);
			if (!currentChat) return;

			const isFirst = currentChat.messages.length === 1;
			const newTitle = isFirst ? generateTitle(text) : currentChat.title;

			// rename if it's firsta message
			if (isFirst) {
				try {
					await apiFetch(
						`${import.meta.env.VITE_AI_API}/api/chat/rename`,
						{
							method: "PATCH",
							headers: { "Content-Type": "application/json" },
							body: JSON.stringify({
								chatId: activeChatId,
								title: newTitle,
							}),
						},
					);
				} catch (err) {
					console.error("Rename failed", err);
				}
			}

			// instant UI update
			setChats((prev) =>
				prev.map((chat) => {
					if (chat.id !== activeChatId)
						return { ...chat, suggestions: [] };

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

			const res = await apiFetch(
				`${import.meta.env.VITE_AI_API}/api/chat`,
				{
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({
						message: text,
						chatId: activeChatId,
					}),
				},
			);

			if (!res.body) {
				throw new Error("No response body");
			}

			const reader = res.body.getReader();
			const decoder = new TextDecoder();

			let full = "";
			let suggestionsStarted = false;

			while (true) {
				const { done, value } = await reader.read();
				if (done) break;

				const chunk = decoder.decode(value);
				full += chunk;

				// start suggestions
				if (!suggestionsStarted && full.length > 150) {
					suggestionsStarted = true;

					setSuggestionsLoading(true);

					// do not block stream
					fetchSuggestions(text, full, activeChatId);
				}

				const BATCH_SIZE = 4;

				for (let i = 0; i < chunk.length; i += BATCH_SIZE) {
					const sliceLength = Math.min(BATCH_SIZE, chunk.length - i);

					const partial = full.slice(
						0,
						full.length - chunk.length + i + sliceLength,
					);

					setChats((prev) =>
						prev.map((chat) => {
							if (chat.id !== activeChatId) return chat;

							const msgs = [...chat.messages];
							msgs[msgs.length - 1] = {
								role: "assistant",
								content: partial,
							};

							return { ...chat, messages: msgs };
						}),
					);

					await new Promise((r) => requestAnimationFrame(r));
				}
			}

			// fallback if it's not started
			if (!suggestionsStarted) {
				setSuggestionsLoading(true);
				await fetchSuggestions(text, full, activeChatId);
			} else {
				fetchSuggestions(text, full, activeChatId);
			}
		} catch (err) {
			console.error(err);
		} finally {
			setLoading(false);
		}
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
		const res = await apiFetch(
			`${import.meta.env.VITE_AI_API}/api/chat/create`,
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
		await apiFetch(`${import.meta.env.VITE_AI_API}/api/chat/rename`, {
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
			await apiFetch(`${import.meta.env.VITE_AI_API}/api/chat/${id}`, {
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
			await apiFetch(`${import.meta.env.VITE_AI_API}/api/chat/pin`, {
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

				<div className="chat-suggestions-wrapper">
					<ChatSuggestions
						suggestions={activeChat?.suggestions || []}
						loading={suggestionsLoading}
						onSelect={sendMessage}
					/>
				</div>

				<ChatInput onSend={sendMessage} disabled={loading} />
			</div>
		</div>
	);
};

export default ChatWindow;
