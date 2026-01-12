import React from "react";

import "./Technologies.scss";

const technologies = {
	frontend: [
		"HTML",
		"CSS / SASS",
		"JavaScript (ES6+)",
		"TypeScript",
		"React",
		"Next.js",
		"Vue.js",
		"Redux Toolkit",
		"Ant Design",
		"Material UI",
		"Tailwind CSS",
		"Bootstrap",
	],
	backend: ["Node.js", "Firebase", "MongoDB", "REST APIs"],
	fullstack: ["MERN Stack"],
	tools: ["Git", "GitHub", "Vite", "Yarn"],
};

const Technologies = () => {
	return (
		<section className="technologies section" id="technologies">
			<div className="container">
				<h2 className="technologies-title">Technologies</h2>

				<div className="technologies-grid">
					<div className="technologies-group">
						<h3>Frontend</h3>
						<ul>
							{technologies.frontend.map((tech) => (
								<li key={tech}>{tech}</li>
							))}
						</ul>
					</div>

					<div className="technologies-group">
						<h3>Backend</h3>
						<ul>
							{technologies.backend.map((tech) => (
								<li key={tech}>{tech}</li>
							))}
						</ul>
					</div>

					<div className="technologies-group">
						<h3>Tools</h3>
						<ul>
							{technologies.tools.map((tech) => (
								<li key={tech}>{tech}</li>
							))}
						</ul>
					</div>
					<div className="technologies-group">
						<h3>Full-Stack</h3>
						<ul>
							{technologies.fullstack.map((tech) => (
								<li key={tech}>{tech}</li>
							))}
						</ul>
					</div>
				</div>
			</div>
		</section>
	);
};

export default Technologies;
