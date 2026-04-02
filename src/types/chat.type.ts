export type Role = "user" | "assistant";

export type Chat = {
	id: string;
	title: string;
	messages: Message[];
};

export interface Message {
	role: Role;
	content: string;
}
