import { createContext, FC } from "react";
import { Socket } from "socket.io-client";
import useSocketSetup, { IInitialData, IMessage } from "../hooks/useSocketSetup";
import Messages from "./messages";
import SideBar from "./SideBar";

type Props = {
    userName: string;
    logout: ()=>void
};
export const Context = createContext<IInitialData>({ users: [], messages: [] });
const Chat: FC<Props> = ({ userName, logout }) => {
    const { users, messages } = useSocketSetup(userName);
    return (
        <div className="flex flex-nowrap">
            <Context.Provider value={{users, messages}}>
                <SideBar userName={userName} logout={logout} />
                <Messages />
            </Context.Provider>
        </div>
    );
};
export default Chat;
