import { Disclosure } from "@headlessui/react";
import { ChevronUpIcon } from "@heroicons/react/20/solid";
import { FC } from "react";

type Props = {
    sender: string;
    title: string;
    date: string;
};

const dateFormater = new Intl.DateTimeFormat(undefined, {
    dateStyle: "short",
    timeStyle: "short",
});

const MessageButton: FC<Props> = ({ sender, title, date }) => {
    return (
        <Disclosure.Button className="flex my-2 w-full flex-nowrap justify-between sm:rounded-lg bg-sky-50 sm:px-4 py-2 text-left hover:bg-sky-200 focus:outline-none focus-visible:ring focus-visible:ring-slate-500 focus-visible:ring-opacity-75">
            <div className="flex-col sm:flex-row max-w-[60%] shrink justify-start items-center text-slate-900 text-lg">
                <div className="overflow-hidden h-8 w-5/6 text-ellipsis mx-2 font-medium">
                    {sender}
                </div>
                <div className="overflow-hidden h-8 w-5/6 text-ellipsis mx-2 font-normal">
                    {title}
                </div>
            </div>
            <span className="text-md w-24 shrink-0 pr-1 text-slate-500">
                {dateFormater.format(new Date(date))}
            </span>
        </Disclosure.Button>
    );
};
export default MessageButton;
