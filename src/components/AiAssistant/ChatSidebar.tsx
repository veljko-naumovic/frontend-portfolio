import { useState } from "react";

interface Props {
	chats: { id: string; title: string }[];
	activeChatId: string;
	onSelect: (id: string) => void;
	onNewChat: () => void;
	onRename: (id: string, title: string) => void;
	isOpen: boolean;
}

const ChatSidebar: React.FC<Props> = ({
	chats,
	activeChatId,
	onSelect,
	onNewChat,
	onRename,
	isOpen,
}) => {
	const [editingId, setEditingId] = useState<string | null>(null);
	const [value, setValue] = useState("");

	return (
		<div className={`sidebar ${!isOpen ? "collapsed" : ""}`}>
			{!isOpen && <div className="collapsed-label">Messages</div>}

			<button className="new" onClick={onNewChat}>
				+
			</button>

			{chats.map((chat) => (
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
						</>
					)}
				</div>
			))}
		</div>
	);
};

export default ChatSidebar;
