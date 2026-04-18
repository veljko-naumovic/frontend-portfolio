import React, { useState } from "react";
import ChatWindow from "./ChatWindow";
import "./AiAssistant.scss";

interface AiAssistantProps {
	openAiAssistant: boolean;
	setOpenAiAssistant: React.Dispatch<React.SetStateAction<boolean>>;
}

const AiAssistant: React.FC<AiAssistantProps> = (props) => {
	const { openAiAssistant, setOpenAiAssistant } = props;

	const [showBadge, setShowBadge] = useState(true);

	const toggleChat = () => {
		setOpenAiAssistant((prev) => {
			if (!prev) setShowBadge(false); //
			return !prev;
		});
	};

	return (
		<div className="ai-wrapper">
			{showBadge && !openAiAssistant && (
				<div className="ai-badge" onClick={toggleChat}>
					Ask me anything
				</div>
			)}

			<button
				className={`ai-button ${!openAiAssistant ? "pulse" : ""}`}
				onClick={toggleChat}
			>
				🤖
			</button>
			{openAiAssistant && (
				<ChatWindow onClose={() => setOpenAiAssistant(false)} />
			)}
		</div>
	);
};

export default AiAssistant;
