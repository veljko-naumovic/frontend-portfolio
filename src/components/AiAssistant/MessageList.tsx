import { Message } from "../../types/chat.type";
import { useEffect, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import "./MessageList.scss";

interface MessageListProps {
	messages: Message[] | undefined;
	loading: boolean;
	onRegenerate?: () => void;
}

// SIMPLE typing preview
const TypingPreview = ({ text }: { text: string }) => {
	const clean = text
		.replace(/\*\*/g, "")
		.replace(/__/g, "")
		.replace(/`/g, "");

	return (
		<span>
			{clean}
			{clean && <span className="cursor">▍</span>}
		</span>
	);
};

const MessageList: React.FC<MessageListProps> = ({
	messages,
	loading,
	onRegenerate,
}) => {
	const bottomRef = useRef<HTMLDivElement | null>(null);
	const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

	// auto scroll
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

				const isThinking =
					isLast &&
					msg.role === "assistant" &&
					loading &&
					!msg.content;

				const isTyping =
					isLast &&
					msg.role === "assistant" &&
					loading &&
					!!msg.content;

				return (
					<div
						key={i}
						className={`message ${msg.role} ${isLast ? "new" : ""}`}
					>
						{/* copy */}
						<button
							className="copy-btn"
							onClick={() => handleCopy(msg.content, i)}
						>
							⧉
							{copiedIndex === i && (
								<span className="tooltip">Copied!</span>
							)}
						</button>

						{isThinking ? (
							<div className="typing">
								<span className="typing-text">Thinking</span>
								<div className="dots">
									<span />
									<span />
									<span />
								</div>
							</div>
						) : isTyping ? (
							<TypingPreview text={msg.content} />
						) : (
							<ReactMarkdown>{msg.content}</ReactMarkdown>
						)}

						{/* regenerate */}
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

			{/* scroll anchor */}
			<div ref={bottomRef} />

			{/* spacer for input  */}
			<div className="messages-spacer" />
		</div>
	);
};

export default MessageList;
