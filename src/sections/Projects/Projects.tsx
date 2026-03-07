import Card from "../../components/Card/Card";
import "./Projects.scss";

const projects = [
	{
		title: "React + TypeScript + Ant Design",
		description:
			"Enterprise-style frontend application built with React 18, TypeScript and Ant Design. Focus on clean architecture and reusable components.",
		tech: ["React", "TypeScript", "Ant Design"],
		github: "#",
		live: "#",
	},
	{
		title: "Redux + TinyMCE Editor",
		description:
			"Content management interface with Redux state management and TinyMCE rich text editor integration.",
		tech: ["React", "Redux", "TinyMCE"],
		github: "#",
		live: "#",
	},
	{
		title: "Vue 3 + TypeScript + Vuetify",
		description:
			"Modern Vue 3 application using TypeScript and Vuetify, focused on clean UI and component-based structure.",
		tech: ["Vue 3", "TypeScript", "Vuetify"],
		github: "#",
		live: "#",
	},
];

const Projects = () => {
	return (
		<section className="projects section" id="projects">
			<div className="container">
				<h2 className="projects-title">Projects</h2>

				<div className="projects-grid">
					{projects.map((project) => (
						<Card
							key={project.title}
							title={project.title}
							description={project.description}
							tech={project.tech}
							github={project.github}
							live={project.live}
						/>
					))}
				</div>
			</div>
		</section>
	);
};

export default Projects;
