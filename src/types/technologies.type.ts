import { IconType } from "react-icons";

export type Technology = {
	label: string;
	icon: IconType;
};

export type Technologies = {
	frontend: Technology[];
	backend: Technology[];
	fullstack: Technology[];
	tools: Technology[];
	ai: Technology[];
};
