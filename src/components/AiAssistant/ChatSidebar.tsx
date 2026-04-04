import { useState } from "react";
import { Chat } from "../../types/chat.type";

interface Props {
	chats: Chat[];
	activeChatId: string;
	onSelect: (id: string) => void;
	onNewChat: () => void;
	onRename: (id: string, title: string) => void;
	onDelete: (id: string) => void;
	onTogglePin: (id: string) => void;
	isOpen: boolean;
}

const ChatSidebar: React.FC<Props> = ({
	chats,
	activeChatId,
	onSelect,
	onNewChat,
	onRename,
	onDelete,
	onTogglePin,
	isOpen,
}) => {
	const [editingId, setEditingId] = useState<string | null>(null);
	const [value, setValue] = useState("");
	const [search, setSearch] = useState("");

	const filterChats = (list: Chat[]) =>
		list.filter((c) =>
			c.title.toLowerCase().includes(search.toLowerCase()),
		);

	const pinnedChats = filterChats(chats.filter((c) => c.pinned));
	const normalChats = filterChats(chats.filter((c) => !c.pinned));

	const highlight = (text: string) => {
		if (!search) return text;

		const regex = new RegExp(`(${search})`, "gi");
		return text
			.split(regex)
			.map((part, i) =>
				part.toLowerCase() === search.toLowerCase() ? (
					<strong key={i}>{part}</strong>
				) : (
					part
				),
			);
	};

	const renderItem = (chat: Chat) => (
		<div
			key={chat.id}
			className={`item ${chat.id === activeChatId ? "active" : ""}`}
			title={chat.title}
			onClick={() => editingId !== chat.id && onSelect(chat.id)}
			onDoubleClick={() => {
				setEditingId(chat.id);
				setValue(chat.title);
			}}
		>
			{editingId === chat.id ? (
				<input
					className="rename-input"
					value={value}
					autoFocus
					onClick={(e) => e.stopPropagation()}
					onChange={(e) => setValue(e.target.value)}
					onBlur={() => {
						onRename(chat.id, value);
						setEditingId(null);
					}}
					onKeyDown={(e) => {
						if (e.key === "Enter") {
							onRename(chat.id, value);
							setEditingId(null);
						}
						if (e.key === "Escape") setEditingId(null);
					}}
				/>
			) : (
				<>
					<span className="icon">💬</span>
					<span className="text">{highlight(chat.title)}</span>

					<div className="actions">
						<button
							className={`pin-btn ${chat.pinned ? "active" : ""}`}
							onClick={(e) => {
								e.stopPropagation();
								onTogglePin(chat.id);
							}}
						>
							⭐
						</button>

						<button
							className="delete-btn"
							onClick={(e) => {
								e.stopPropagation();
								onDelete(chat.id);
							}}
						>
							🗑️
						</button>
					</div>
				</>
			)}
		</div>
	);

	return (
		<div className={`sidebar ${!isOpen ? "collapsed" : ""}`}>
			{!isOpen && <div className="collapsed-label">Messages</div>}

			<button className="new" onClick={onNewChat}>
				+
			</button>
			<div className="search-wrapper">
				<input
					placeholder="Search..."
					value={search}
					onChange={(e) => setSearch(e.target.value)}
					className="search-input"
				/>

				{search && (
					<button className="clear-btn" onClick={() => setSearch("")}>
						✕
					</button>
				)}
			</div>
			<div className="chat-list">
				{pinnedChats.length > 0 && (
					<div className="chat-section">Pinned</div>
				)}
				{pinnedChats.map(renderItem)}

				{normalChats.length > 0 && (
					<div className="chat-section">All chats</div>
				)}
				{normalChats.map(renderItem)}
			</div>
			{pinnedChats.length === 0 && normalChats.length === 0 && (
				<div className="chat-section">No results</div>
			)}
		</div>
	);
};

export default ChatSidebar;
