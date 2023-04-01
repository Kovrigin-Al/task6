export interface IUser {
    id: number;
    name: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface IMessage {
    id: number;
    title: string;
    messageBody: string;
    recipientId: number;
    senderId: number;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface IReceivedMessage {
    title: string;
    messageBody: string;
    recipient: string;
    sender: string;
}