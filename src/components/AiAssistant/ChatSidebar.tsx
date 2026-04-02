type Chat = {
	id: string;
	title: string;
};

interface ChatSidebarProps {
	chats: Chat[];
	activeChatId: string;
	onSelect: (id: string) => void;
	onNewChat: () => void;
}

const ChatSidebar: React.FC<ChatSidebarProps> = ({
	chats,
	activeChatId,
	onSelect,
	onNewChat,
}) => {
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
						onClick={() => onSelect(chat.id)}
					>
						{chat.title}
					</div>
				))}
			</div>
		</div>
	);
};

export default ChatSidebar;
