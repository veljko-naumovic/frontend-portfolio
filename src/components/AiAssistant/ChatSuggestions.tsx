import "./ChatSuggestions.scss";

interface Props {
	suggestions: string[];
	loading?: boolean;
	onSelect: (text: string) => void;
}

const ChatSuggestions: React.FC<Props> = ({
	suggestions,
	loading,
	onSelect,
}) => {
	if (loading) {
		return (
			<div
				className={`chat-suggestions ${loading ? "loading" : "ready"}`}
			>
				<div className="skeleton" />
				<div className="skeleton" />
				<div className="skeleton" />
			</div>
		);
	}

	if (!suggestions.length) return null;

	return (
		<div className={`chat-suggestions ${loading ? "loading" : "ready"}`}>
			{suggestions.map((s, i) => (
				<button key={i} onClick={() => onSelect(s)}>
					{s}
				</button>
			))}
		</div>
	);
};

export default ChatSuggestions;
