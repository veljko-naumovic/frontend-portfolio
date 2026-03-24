import { useState } from "react";
interface ChatInputProps {
	onSend: (message: string) => void;
	disabled: boolean;
}
const ChatInput: React.FC<ChatInputProps> = ({ onSend, disabled }) => {
	const [value, setValue] = useState("");

	const handleSend = () => {
		if (!value.trim()) return;
		onSend(value);
		setValue("");
	};

	return (
		<div className="chat__input">
			<input
				value={value}
				onChange={(e) => setValue(e.target.value)}
				disabled={disabled}
				placeholder="Ask something..."
			/>
			<button onClick={handleSend} disabled={disabled}>
				➤
			</button>
		</div>
	);
};

export default ChatInput;
