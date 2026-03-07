import React from "react";
import "./Card.scss";

interface CardProps {
	title: string;
	description: string;
	tech?: string[];
	github?: string;
	live?: string;
}

const Card: React.FC<CardProps> = ({
	title,
	description,
	tech,
	github,
	live,
}) => {
	return (
		<div className="card">
			<h3 className="card-title">{title}</h3>

			<p className="card-description">{description}</p>

			{tech && (
				<ul className="card-tech">
					{tech.map((item) => (
						<li key={item}>{item}</li>
					))}
				</ul>
			)}

			{(github || live) && (
				<div className="card-links">
					{github && (
						<a
							href={github}
							target="_blank"
							rel="noopener noreferrer"
							className="link-external"
						>
							GitHub
						</a>
					)}

					{live && (
						<a
							href={live}
							target="_blank"
							rel="noopener noreferrer"
							className="link-external"
						>
							Live
						</a>
					)}
				</div>
			)}
		</div>
	);
};

export default Card;
