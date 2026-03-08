export type ExperienceItem = {
	role: string;
	company: string;
	period: string;
	points: string[];
	tech: string[];
};

export const experience: ExperienceItem[] = [
	{
		role: "Frontend React Developer",
		company: "ePonuda",
		period: "2021 – Present",
		points: [
			"Develop and maintain the frontend of an internal data management platform using React.",
			"Build and refine reusable UI components with a strong focus on performance and scalability.",
			"Collaborate on multiple production projects, including the leading price comparison website in Serbia.",
			"Contribute to platforms used across the Adria region in a production environment.",
		],
		tech: ["React", "TypeScript", "Ant Design", "Redux", "REST APIs"],
	},
	{
		role: "Freelance Full-Stack Developer",
		company: "Gorenje Servis & Delovi",
		period: "2020 – 2021",
		points: [
			"Designed and developed a full-stack web application tailored to internal business needs.",
			"Implemented frontend features using React and TypeScript.",
			"Developed backend logic and APIs using Node.js and Firebase.",
			"Worked directly with the client to gather requirements and deliver a production-ready solution.",
		],
		tech: ["React", "TypeScript", "Node.js", "Firebase"],
	},
	{
		role: "Postal Center Operator",
		company: "Post of Serbia",
		period: "2005 – 2021",
		points: [
			"Worked as a video-coding operator supporting automated mail sorting systems.",
			"Maintained accuracy and coordination in a high-volume production environment.",
		],
		tech: ["Operations", "Process Coordination"],
	},
];
