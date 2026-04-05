import { useState } from "react";
import ChatWindow from "./ChatWindow";
import "./AiAssistant.scss";

const AiAssistant = () => {
	const [open, setOpen] = useState(false);
	const [showBadge, setShowBadge] = useState(true);

	const toggleChat = () => {
		setOpen((prev) => {
			if (!prev) setShowBadge(false); //
			return !prev;
		});
	};

	return (
		<div className="ai-wrapper">
			{showBadge && !open && (
				<div className="ai-badge" onClick={toggleChat}>
					Ask me anything
				</div>
			)}

			<button
				className={`ai-button ${!open ? "pulse" : ""}`}
				onClick={toggleChat}
			>
				🤖
			</button>
			{open && <ChatWindow onClose={() => setOpen(false)} />}
		</div>
	);
};

export default AiAssistant;
