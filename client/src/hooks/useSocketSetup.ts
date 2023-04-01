import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { socket } from "../socket";

export interface IMessage {
    title: string,
    messageBody: string,
    createdAt: string,
    sender: {
        name: string
    }
}

export interface IInitialData {
    users: string[],
    messages: IMessage[]
}

const useSocketSetup = (userName: string) => {
    const [initialData, setInitialData] = useState<IInitialData>({
        users: [userName],
        messages: []
    })

    useEffect(() => {
        socket.auth = {
            name: userName
        }
        socket.connect();
        socket.on("connectError", () => {
            console.log((Error('internal server error when connecting a socket')))
        });
        socket.on('connected', (data: IInitialData) => {
            setInitialData(data)
        })
        socket.on('sendMessage', (data) => {
            setInitialData(prev=>({...prev, messages: [...prev.messages, data]}))
        })
        return () => {
            socket.off("connectError");
            socket.off("connected");
            socket.off("sendMessage");
        };
    }, [userName, socket]);
    return initialData
};
export default useSocketSetup;

