import Card from "../../components/Card/Card";
import { projects } from "../../data/projects.data";
import { Project } from "../../types/projects.type";
import "./Projects.scss";

const Projects = () => {
	const handleLiveClick = (
		e: React.MouseEvent<HTMLAnchorElement>,
		project: Project,
	) => {
		if (project.isAI) {
			e.preventDefault();

			// otvori chat
			// (window as any).openChatbot?.();
		}
	};
	return (
		<section className="projects section" id="projects">
			<div className="container">
				<h2 className="projects-title">Projects</h2>

				<div className="projects-grid">
					{projects.map((project) => (
						<Card key={project.title} title={project.title}>
							<div className="project-image">
								<div className="browser-frame">
									<div className="browser-header">
										<span />
										<span />
										<span />
									</div>

									<div className="browser-content">
										<img
											src={project.image}
											alt={project.title}
										/>

										<div className="project-overlay">
											<span>View project</span>
										</div>
									</div>
								</div>
							</div>

							<p className="project-description">
								{project.description}
							</p>

							<ul className="project-tech">
								{project.tech.map((tech) => (
									<li key={tech} className="tag">
										{tech}
									</li>
								))}
							</ul>

							<div className="project-links">
								<a
									href={project.github}
									target="_blank"
									rel="noopener noreferrer"
								>
									GitHub
								</a>
								<a
									href={project.live}
									target={project.isAI ? "_self" : "_blank"}
									rel="noopener noreferrer"
									onClick={(e) => handleLiveClick(e, project)}
								>
									{project.isAI ? "Try AI" : "Live Demo"}
								</a>
							</div>
						</Card>
					))}
				</div>
			</div>
		</section>
	);
};

export default Projects;
