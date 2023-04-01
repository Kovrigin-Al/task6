import { Socket } from "socket.io";
import { Messages, Users } from "../models/models";

interface receivedMessage {
    title: string,
    messageBody: string,
    createdAt: string,
    sender: {
        name: string
    }
}

interface IUserWithMessages {
    name: string,
    receivedMessages: receivedMessage[]
}


export class UserController {
    static async handleUserConnection(name: string) {
        const messages = await UserController.#getUserMessages(name);
        const users = await UserController.#getAllUsers();
        return { users, messages: messages?.receivedMessages || [] }
    }

    static async #getAllUsers() {
        const users = await Users.findAll()
            .then(responseObject => responseObject.map(u => u.get({ plain: true })))
        return users.map(u => u.name)
    }

    static async #getUserMessages(name: string) {
        const user = await UserController.#getUserWithMessages(name)
        if (user === null) {
            await Users.create({ name })
            return undefined
        } else {
            return user.get({ plain: true }) as unknown as IUserWithMessages
        }
    }

    static async #getUserWithMessages(name: string) {
        return await Users.findOne({
            attributes: ['name'],
            include: [{
                model: Messages,
                as: 'receivedMessages',
                attributes: ['title', 'messageBody', 'createdAt'],
                include: [{ model: Users, as: 'sender', attributes: ['name'] }],
            }],
            where: { name }
        })
    }
}
