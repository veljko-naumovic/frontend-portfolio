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
import { Technologies } from "../types/technologies.type";

export const technologies: Technologies = {
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
