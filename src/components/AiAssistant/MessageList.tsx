import { Message } from "../../types/chat.type";
import { useEffect, useRef } from "react";
import "./MessageList.scss";

interface MessageListProps {
	messages: Message[];
	loading: boolean;
}

const MessageList: React.FC<MessageListProps> = ({ messages, loading }) => {
	const bottomRef = useRef<HTMLDivElement | null>(null);

	useEffect(() => {
		bottomRef.current?.scrollIntoView({
			behavior: "smooth",
		});
	}, [messages]);

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

			<div ref={bottomRef} />
		</div>
	);
};

export default MessageList;
