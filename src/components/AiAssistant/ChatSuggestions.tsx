import "./ChatSuggestions.scss";

interface Props {
	suggestions: string[];
	onSelect: (text: string) => void;
}

const ChatSuggestions: React.FC<Props> = ({ suggestions, onSelect }) => {
	if (!suggestions.length) return null;

	return (
		<div className="chat-suggestions">
			{suggestions.map((s, i) => (
				<button key={i} onClick={() => onSelect(s)}>
					{s}
				</button>
			))}
		</div>
	);
};

export default ChatSuggestions;
