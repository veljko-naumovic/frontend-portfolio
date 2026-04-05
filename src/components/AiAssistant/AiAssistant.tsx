import { useState } from "react";
import ChatWindow from "./ChatWindow";
import "./AiAssistant.scss";

const AiAssistant = () => {
	const [open, setOpen] = useState(false);

	return (
		<>
			<button
				className={`ai-button ${!open ? "pulse" : ""}`}
				onClick={() => setOpen((prev) => !prev)}
			>
				💬
			</button>

			{open && <ChatWindow onClose={() => setOpen(false)} />}
		</>
	);
};

export default AiAssistant;
