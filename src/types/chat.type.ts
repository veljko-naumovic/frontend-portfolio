export type Role = "user" | "assistant";

export interface Message {
	role: Role;
	content: string;
	createdAt?: string;
	_id?: string;
}

export type Chat = {
	id: string;
	title: string;
	messages: Message[];
	pinned?: boolean;
	suggestions?: string[];
};
