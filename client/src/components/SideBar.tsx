import { FC, useContext } from "react";
import NewMessage from "./newMessage/NewMessageModal";

type Props = {
    userName: string;
    logout: () => void;
};
const SideBar: FC<Props> = ({ userName, logout }) => {
    return (
        <div className="w-48 flex flex-col justify-start items-center bg-slate-100 h-screen overflow-y-scroll">
            <div className="my-2 font-medium text-sky-800 p-1 text-center">
                I are logged in as {userName}
            </div>
            <NewMessage />
            <button
                onClick={logout}
                className="rounded-md border border-transparent my-5 bg-red-100 px-4 py-2 text-sm font-medium text-red-900 hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
            >
                logout
            </button>
        </div>
    );
};
export default SideBar;
