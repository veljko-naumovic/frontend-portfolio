import { ExperienceItem } from "../types/experience.type";

export const experience: ExperienceItem[] = [
	{
		role: "Frontend React Developer",
		company: "ePonuda",
		period: "2021 – Present",
		points: [
			"Develop and maintain scalable React applications for an internal data management platform.",
			"Build reusable and performant UI components using TypeScript and Ant Design.",
			"Collaborate on multiple production systems, including a leading price comparison platform in Serbia.",
			"Optimize rendering and state management for large datasets and complex filtering logic.",
			"Work closely with cross-functional teams to deliver reliable and maintainable features.",
		],
		tech: ["React", "TypeScript", "Ant Design", "Redux", "REST APIs"],
	},
	{
		role: "Freelance Full-Stack Developer",
		company: "Gorenje Servis & Delovi",
		period: "2020 – 2021",
		points: [
			"Designed and developed a full-stack web application tailored to internal business workflows.",
			"Built responsive frontend using React and TypeScript with a focus on usability and performance.",
			"Implemented backend APIs and business logic using Node.js and Firebase.",
			"Collaborated directly with the client to define requirements and deliver a production-ready solution.",
		],
		tech: ["React", "TypeScript", "Node.js", "Firebase"],
	},
	{
		role: "Postal Center Operator",
		company: "Post of Serbia",
		period: "2005 – 2021",
		points: [
			"Operated and monitored automated mail sorting systems in a high-volume production environment.",
			"Ensured accuracy and efficiency through consistent attention to detail and process adherence.",
			"Developed strong problem-solving and operational coordination skills in a time-sensitive environment.",
		],
		tech: [],
	},
];
