import { FC, useContext } from "react";
import { IMessage } from "../../hooks/useSocketSetup";
import { Context } from "../Chat";
import MessageContainer from "./MessageContainer";

type Props = {
};
const Messages: FC<Props> = ( ) => {
    const {messages} = useContext(Context)
    return (
        <div className="w-full h-screen overflow-y-scroll  sm:px-4 pt-16">
            {messages.length !== 0 && (
                <div className="mx-auto w-full sm:rounded-2xl bg-white sm:px-2 py-2">
                    {messages.map((m, index) => (
                        <MessageContainer key={m.sender.name+index} message={m} />
                    ))}
                </div>
            )}
        </div>
    );
};
export default Messages;
