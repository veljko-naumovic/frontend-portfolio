import { useState, FormEvent, useRef, useEffect } from "react";
import "./ChatInput.scss";

interface ChatInputProps {
	onSend: (message: string) => void;
	disabled: boolean;
}

const ChatInput: React.FC<ChatInputProps> = ({ onSend, disabled }) => {
	const [value, setValue] = useState<string>("");
	const inputRef = useRef<HTMLInputElement | null>(null);

	useEffect(() => {
		inputRef.current?.focus();
	}, []);

	const handleSubmit = (e: FormEvent) => {
		e.preventDefault();

		if (!value.trim() || disabled) return;

		onSend(value);
		setValue("");

		// 👇 fokus posle slanja
		setTimeout(() => {
			inputRef.current?.focus();
		}, 0);
	};

	return (
		<form className="chat-input" onSubmit={handleSubmit}>
			<input
				ref={inputRef}
				value={value}
				onChange={(e) => setValue(e.target.value)}
				placeholder="Ask something..."
			/>

			<button type="submit" disabled={disabled}>
				➤
			</button>
		</form>
	);
};

export default ChatInput;
