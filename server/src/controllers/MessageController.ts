import { ChatUsers, Messages } from "../models/models";
import { IReceivedMessage } from "../types/databaseTypes";

export class MessageController {
    static async saveMessage({ messageBody, title, recipient, sender }: IReceivedMessage) {
        const senderId = await MessageController.#findUserIdByName(sender)
        const recipientId = await MessageController.#findUserIdByName(recipient)
        const createdAt = await MessageController.#createMessage(messageBody, title, senderId, recipientId)
        return { title, messageBody, createdAt, sender: { name: sender } }
    }

    static async #findUserIdByName(name: string) {
        const user = await ChatUsers.findOne({ where: { name } });
        if (user === null) {
            return (await ChatUsers.create({name})).getDataValue('id')
        } else {
            return user.getDataValue('id');
        }
    }

    static async #createMessage(messageBody: string, title: string, senderId: number, recipientId: number) {
        const messageCreated = (await Messages.create({ messageBody, title, senderId, recipientId }))
        return messageCreated.getDataValue('createdAt')
    }
}