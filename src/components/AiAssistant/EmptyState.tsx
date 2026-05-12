import "./EmptyState.scss";

const EmptyState = ({ onSelect }: { onSelect: (q: string) => void }) => {
	const questions = [
		"Tell me about his experience",
		"What technologies does Veljko use?",
		"Show me his projects",
		"How did Veljko transition into IT?",
	];

	return (
		<div className="empty">
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
