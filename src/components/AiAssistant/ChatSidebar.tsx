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

	const pinnedChats = chats.filter((c) => c.pinned);
	const normalChats = chats.filter((c) => !c.pinned);

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
					<span className="text">{chat.title}</span>

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
		</div>
	);
};

export default ChatSidebar;
