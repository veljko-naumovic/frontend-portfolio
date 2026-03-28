import { Message } from "../../types/chat.type";
import { useEffect, useRef } from "react";
import ReactMarkdown from "react-markdown";
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
		<div className="messages">
			{messages.map((msg, i) => {
				const isLast = i === messages.length - 1;

				return (
					<div
						key={i}
						className={`message ${msg.role} ${isLast ? "new" : ""}`}
					>
						<ReactMarkdown>{msg.content}</ReactMarkdown>

						{loading && isLast && msg.role === "assistant" && (
							<span className="cursor">|</span>
						)}
					</div>
				);
			})}

			<div ref={bottomRef} />
		</div>
	);
};

export default MessageList;
