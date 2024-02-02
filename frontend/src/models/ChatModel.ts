export interface ChatModel {
    _id: string,
    name: string,
    members: string[],
    latestMessage?: string,
    latestMessageOwner?: string,
    createdAt: string,
    updatedAt: string
}