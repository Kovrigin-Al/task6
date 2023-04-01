import { Disclosure } from "@headlessui/react";
import { ChevronUpIcon } from "@heroicons/react/20/solid";
import { FC } from "react";
import { IMessage } from "../../hooks/useSocketSetup";
import MessageButton from "./MessageButton";

type Props = {
    message: IMessage;
};

const MessageContainer: FC<Props> = ({ message }) => {
    return (
        <Disclosure>
            <MessageButton
                date={message.createdAt}
                sender={message.sender.name}
                title={message.title}
            />
            <Disclosure.Panel className="px-4 pt-4 pb-2 text-md text-gray-500 whitespace-pre">
                {message.messageBody}
            </Disclosure.Panel>
        </Disclosure>
    );
};
export default MessageContainer;
