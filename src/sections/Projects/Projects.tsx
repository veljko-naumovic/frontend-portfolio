import Card from "../../components/Card/Card";
import "./Projects.scss";

const projects = [
	{
		title: "Dashboard - React + TypeScript + Ant Design",
		description:
			"Data-driven dashboard built with React, TypeScript and Ant Design. Includes interactive charts, sortable tables and reusable UI components.",
		image: "/projects/project1.png",
		tech: ["React", "TypeScript", "Ant Design"],
		github: "https://github.com/veljko-naumovic/react-admin-dashboard",
		live: "https://react-admin-dashboard-bc85d.web.app/login",
	},
	{
		title: "Booking App – Next.js + Redux Toolkit",
		description:
			"Booking and reservation management app built with Next.js and TypeScript. Features filtering, status management and Redux Toolkit state handling.",
		image: "/projects/project2.png",
		tech: ["Next", "TypeScript", "Redux", "Tailwind"],
		github: "https://github.com/veljko-naumovic/reservation-system-frontend",
		live: "https://reservation-system-frontend-seven.vercel.app/",
	},
	{
		title: "E-commerce – Vue + Pinia + TypeScript",
		description:
			"Modern e-commerce frontend built with Vue 3, TypeScript and Pinia. Includes product listing, cart state management and clean component architecture.",
		image: "/projects/project3.png",
		tech: ["Vue 3", "TypeScript", "Pinia"],
		github: "https://github.com/veljko-naumovic/e-commerce-vue",
		live: "https://vue-app-a7ac6.web.app/",
	},
];

const Projects = () => {
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
									<li key={tech}>{tech}</li>
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
									target="_blank"
									rel="noopener noreferrer"
								>
									Live
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
