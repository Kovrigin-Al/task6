import { Messages, Users } from "../models/models";
import { IReceivedMessage } from "../types/databaseTypes";

export class MessageController {
    static async saveMessage({ messageBody, title, recipient, sender }: IReceivedMessage) {
        const senderId = await MessageController.#findUserIdByName(sender)
        const recipientId = await MessageController.#findUserIdByName(recipient)
        const createdAt = await MessageController.#createMessage(messageBody, title, senderId, recipientId)
        return { title, messageBody, createdAt, sender: { name: sender } }
    }

    static async #findUserIdByName(name: string) {
        const user = await Users.findOne({ where: { name } });
        if (user === null) {
            throw new Error('Incorrect user name provided');
        }
        return user.getDataValue('id');
    }

    static async #createMessage(messageBody: string, title: string, senderId: number, recipientId: number) {
        const messageCreated = (await Messages.create({ messageBody, title, senderId, recipientId }))
        return messageCreated.getDataValue('createdAt')
    }
}