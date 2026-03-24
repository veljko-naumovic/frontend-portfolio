import { Message } from "../../types/chat.type";

interface MessageListProps {
	messages: Message[];
	loading: boolean;
}

const MessageList: React.FC<MessageListProps> = ({ messages, loading }) => {
	return (
		<div className="chat__messages">
			{messages.map((msg, i) => (
				<div
					key={i}
					className={`chat__message chat__message--${msg.role}`}
				>
					{msg.content}
				</div>
			))}

			{loading && <div className="chat__typing">Typing...</div>}
		</div>
	);
};

export default MessageList;
