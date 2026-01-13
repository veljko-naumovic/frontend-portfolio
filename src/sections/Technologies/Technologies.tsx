import {
	FaHtml5,
	FaCss3Alt,
	FaJs,
	FaReact,
	FaNodeJs,
	FaGitAlt,
	FaLayerGroup,
} from "react-icons/fa";

import {
	SiTypescript,
	SiNextdotjs,
	SiVuedotjs,
	SiRedux,
	SiAntdesign,
	SiMui,
	SiTailwindcss,
	SiBootstrap,
	SiFirebase,
	SiMongodb,
	SiVite,
	SiYarn,
	SiPostman,
} from "react-icons/si";
import "./Technologies.scss";

const technologies = {
	frontend: [
		{ label: "HTML", icon: FaHtml5 },
		{ label: "CSS / SASS", icon: FaCss3Alt },
		{ label: "JavaScript (ES6+)", icon: FaJs },
		{ label: "TypeScript", icon: SiTypescript },
		{ label: "React", icon: FaReact },
		{ label: "Next.js", icon: SiNextdotjs },
		{ label: "Vue.js", icon: SiVuedotjs },
		{ label: "Redux Toolkit", icon: SiRedux },
		{ label: "Ant Design", icon: SiAntdesign },
		{ label: "Material UI", icon: SiMui },
		{ label: "Tailwind CSS", icon: SiTailwindcss },
		{ label: "Bootstrap", icon: SiBootstrap },
	],
	backend: [
		{ label: "Node.js", icon: FaNodeJs },
		{ label: "Firebase", icon: SiFirebase },
		{ label: "MongoDB", icon: SiMongodb },
		{ label: "REST APIs", icon: FaJs },
	],
	fullstack: [{ label: "MERN Stack", icon: FaLayerGroup }],
	tools: [
		{ label: "Git", icon: FaGitAlt },
		{ label: "GitHub", icon: FaGitAlt },
		{ label: "Postman", icon: SiPostman },
		{ label: "Vite", icon: SiVite },
		{ label: "Yarn", icon: SiYarn },
	],
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
							{technologies.frontend.map(
								({ label, icon: Icon }) => (
									<li key={label}>
										<Icon />
										{label}
									</li>
								)
							)}
						</ul>
					</div>

					<div className="technologies-group">
						<h3>Backend</h3>
						<ul>
							{technologies.backend.map(
								({ label, icon: Icon }) => (
									<li key={label}>
										<Icon />
										{label}
									</li>
								)
							)}
						</ul>
					</div>

					<div className="technologies-group">
						<h3>Tools</h3>
						<ul>
							{technologies.tools.map(({ label, icon: Icon }) => (
								<li key={label}>
									<Icon />
									{label}
								</li>
							))}
						</ul>
					</div>
					<div className="technologies-group">
						<h3>Full-Stack</h3>
						<ul>
							{technologies.fullstack.map(
								({ label, icon: Icon }) => (
									<li key={label}>
										<Icon />
										{label}
									</li>
								)
							)}
						</ul>
					</div>
				</div>
			</div>
		</section>
	);
};

export default Technologies;
