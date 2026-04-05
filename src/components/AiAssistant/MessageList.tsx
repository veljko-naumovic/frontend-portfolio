import { Message } from "../../types/chat.type";
import { useEffect, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import "./MessageList.scss";

interface MessageListProps {
	messages: Message[] | undefined;
	loading: boolean;
	onRegenerate?: () => void;
}

const MessageList: React.FC<MessageListProps> = ({
	messages,
	loading,
	onRegenerate,
}) => {
	const bottomRef = useRef<HTMLDivElement | null>(null);
	const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

	useEffect(() => {
		bottomRef.current?.scrollIntoView({
			behavior: "smooth",
		});
	}, [messages]);

	const handleCopy = (text: string, index: number) => {
		navigator.clipboard.writeText(text);
		setCopiedIndex(index);

		setTimeout(() => {
			setCopiedIndex(null);
		}, 1500);
	};

	return (
		<div className="messages">
			{messages?.map((msg, i) => {
				const isLast = i === messages.length - 1;

				return (
					<div
						key={i}
						className={`message ${msg.role} ${isLast ? "new" : ""}`}
					>
						<button
							className="copy-btn"
							onClick={() => handleCopy(msg.content, i)}
						>
							⧉
							{copiedIndex === i && (
								<span className="tooltip">Copied!</span>
							)}
						</button>

						<ReactMarkdown>{msg.content}</ReactMarkdown>

						{loading &&
							isLast &&
							msg.role === "assistant" &&
							!msg.content && (
								<div className="typing">
									<span className="typing-text">
										Thinking
									</span>
									<div className="dots">
										<span />
										<span />
										<span />
									</div>
								</div>
							)}

						{!loading &&
							isLast &&
							msg.role === "assistant" &&
							onRegenerate && (
								<button
									className="regen-btn"
									onClick={onRegenerate}
								>
									↻ Regenerate
								</button>
							)}
					</div>
				);
			})}

			{/*  scroll anchor */}
			<div ref={bottomRef} />

			{/* SPACER (NAJBITNIJE) */}
			<div className="messages-spacer" />
		</div>
	);
};

export default MessageList;
