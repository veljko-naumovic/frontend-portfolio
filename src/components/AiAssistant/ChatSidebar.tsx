import { useState } from "react";

type Chat = {
	id: string;
	title: string;
};

interface ChatSidebarProps {
	chats: Chat[];
	activeChatId: string;
	onSelect: (id: string) => void;
	onNewChat: () => void;
	onRename: (id: string, newTitle: string) => void;
}

const ChatSidebar: React.FC<ChatSidebarProps> = ({
	chats,
	activeChatId,
	onSelect,
	onNewChat,
	onRename,
}) => {
	const [editingId, setEditingId] = useState<string | null>(null);
	const [value, setValue] = useState("");

	return (
		<div className="sidebar">
			<button className="new-chat" onClick={onNewChat}>
				+ New Chat
			</button>

			<div className="chat-list">
				{chats.map((chat) => (
					<div
						key={chat.id}
						className={`chat-item ${
							chat.id === activeChatId ? "active" : ""
						}`}
						onClick={() => {
							if (editingId !== chat.id) {
								onSelect(chat.id);
							}
						}}
						onDoubleClick={() => {
							setEditingId(chat.id);
							setValue(chat.title);
						}}
					>
						{editingId === chat.id ? (
							<input
								className="chat-rename-input"
								value={value}
								autoFocus
								onChange={(e) => setValue(e.target.value)}
								onBlur={() => {
									onRename(chat.id, value);
									setEditingId(null);
								}}
								onClick={(e) => e.stopPropagation()}
								onKeyDown={(e) => {
									if (e.key === "Enter") {
										onRename(chat.id, value);
										setEditingId(null);
									}

									if (e.key === "Escape") {
										setEditingId(null);
									}
								}}
							/>
						) : (
							<span>{chat.title}</span>
						)}
					</div>
				))}
			</div>
		</div>
	);
};

export default ChatSidebar;
