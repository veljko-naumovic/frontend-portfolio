import "./SuggestedQuestions.scss";

interface SuggestedQuestionsProps {
	onSelect: (question: string) => void;
}

const questions = [
	"What technologies does Veljko use?",
	"Tell me about his experience",
	"What projects has he worked on?",
	"Does he know TypeScript?",
];

const SuggestedQuestions: React.FC<SuggestedQuestionsProps> = ({
	onSelect,
}) => {
	return (
		<div className="suggested">
			<div className="suggested-title">Ask me:</div>

			{questions.map((q, i) => (
				<button
					key={i}
					className="suggested-item"
					style={{ animationDelay: `${i * 0.08}s` }}
					onClick={() => onSelect(q)}
				>
					{q}
				</button>
			))}
		</div>
	);
};

export default SuggestedQuestions;
