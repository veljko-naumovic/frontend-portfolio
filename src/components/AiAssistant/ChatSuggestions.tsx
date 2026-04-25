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
	// uvek 3 slota
	const items = loading
		? ["", "", ""]
		: [...suggestions.slice(0, 3), "", "", ""].slice(0, 3);

	return (
		<div className={`chat-suggestions ${loading ? "loading" : "ready"}`}>
			{items.map((s, i) => {
				if (loading) {
					return <div key={i} className="skeleton" />;
				}

				// ako nema suggestion → prazan slot (drži visinu)
				if (!s) {
					return <div key={i} className="empty-slot" />;
				}

				return (
					<button key={i} onClick={() => onSelect(s)}>
						{s}
					</button>
				);
			})}
		</div>
	);
};

export default ChatSuggestions;
