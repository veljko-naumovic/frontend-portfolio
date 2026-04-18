import { Project } from "../types/projects.type";

export const projects: Project[] = [
	{
		title: "AI Portfolio Assistant – OpenAI + Pinecone",
		description:
			"AI assistant integrated directly into this portfolio. Uses semantic search with embeddings and a vector database (Pinecone) to retrieve context and generate accurate answers about my experience and projects via OpenAI API.",
		image: "/projects/project0.png", // napravi screenshot chat-a
		tech: ["React", "Node.js", "OpenAI", "Pinecone", "MongoDB"],
		github: "https://github.com/veljko-naumovic/frontend-portfolio/tree/main/src/components/AiAssistant", // ako imaš repo
		live: "#",
		isAI: true,
	},

	{
		title: "Booking App – Next.js + Redux Toolkit",
		description:
			"Full-featured booking system with dynamic filtering, status management and scalable state handling using Redux Toolkit. Designed for clean architecture and maintainable UI logic.",
		image: "/projects/project2.png",
		tech: ["Next", "TypeScript", "Redux", "Tailwind"],
		github: "https://github.com/veljko-naumovic/reservation-system-frontend",
		live: "https://reservation-system-frontend-seven.vercel.app/",
	},

	{
		title: "E-commerce – Vue + Pinia + TypeScript",
		description:
			"Modern e-commerce frontend with structured state management using Pinia. Focused on scalable component architecture and smooth user experience.",
		image: "/projects/project3.png",
		tech: ["Vue 3", "TypeScript", "Pinia"],
		github: "https://github.com/veljko-naumovic/e-commerce-vue",
		live: "https://vue-app-a7ac6.web.app/",
	},

	{
		title: "Dashboard - React + TypeScript + Ant Design",
		description:
			"Interactive dashboard focused on data visualization and performance, featuring reusable components and optimized rendering for large datasets.",
		image: "/projects/project1.png",
		tech: ["React", "TypeScript", "Ant Design"],
		github: "https://github.com/veljko-naumovic/react-admin-dashboard",
		live: "https://react-admin-dashboard-bc85d.web.app/login",
	},
];
