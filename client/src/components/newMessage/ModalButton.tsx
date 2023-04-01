import { FC } from "react";

type Props = {
    handleClick: () => void;
    name: string;
};
const ModalButton: FC<Props> = ({ handleClick, name }) => {
    return (
        <button
            type="button"
            onClick={handleClick}
            className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
        >
            {name}
        </button>
    );
};
export default ModalButton;
