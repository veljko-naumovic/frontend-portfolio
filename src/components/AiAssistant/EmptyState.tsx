import "./EmptyState.scss";

const EmptyState = ({ onSelect }: { onSelect: (q: string) => void }) => {
	const questions = [
		"What technologies does Veljko use?",
		"Tell me about his experience",
		"Show me his projects",
		"What is he currently learning?",
	];

	return (
		<div className="empty">
			<div className="empty-title">🤖 AI Assistant</div>
			<div className="empty-subtitle">
				Ask me anything about Veljko’s experience
			</div>

			<div className="empty-suggestions">
				{questions.map((q) => (
					<button key={q} onClick={() => onSelect(q)}>
						{q}
					</button>
				))}
			</div>
		</div>
	);
};

export default EmptyState;
