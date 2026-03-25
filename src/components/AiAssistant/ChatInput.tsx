import { useState, FormEvent } from "react";
import "./ChatInput.scss";

interface ChatInputProps {
	onSend: (message: string) => void;
	disabled: boolean;
}

const ChatInput: React.FC<ChatInputProps> = ({ onSend, disabled }) => {
	const [value, setValue] = useState<string>("");

	const handleSubmit = (e: FormEvent) => {
		e.preventDefault(); // 🚨 sprečava reload

		if (!value.trim()) return;

		onSend(value);
		setValue("");
	};

	return (
		<form className="chat__input" onSubmit={handleSubmit}>
			<input
				value={value}
				onChange={(e) => setValue(e.target.value)}
				disabled={disabled}
				placeholder="Ask something..."
			/>

			<button type="submit" disabled={disabled}>
				➤
			</button>
		</form>
	);
};

export default ChatInput;
