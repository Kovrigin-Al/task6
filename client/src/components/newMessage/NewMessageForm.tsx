import { FC, useContext } from "react";
import ComboBox from "./ComboBox";
import { SubmitHandler, useForm } from "react-hook-form";
import DataInput from "./DataInput";
import { Context } from "../Chat";
import { socket } from "../../socket";

type Props = {
    handleModalClose: () => void;
};
export interface IFormValues {
    receiptor: string;
    title: string;
    message: string;
}

const NewMessageForm: FC<Props> = ({ handleModalClose }) => {
    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
    } = useForm<IFormValues>({
        defaultValues: {
            message: "",
            receiptor: "",
            title: "",
        },
    });

    const handleFormSubmit: SubmitHandler<IFormValues> = data => {
        socket.emit("sendMessage", 
        {
            content: { message: data.message, title: data.title },
            to: data.receiptor,
        }
        );
        handleModalClose();
    };

    return (
        <>
            <h3 className="text-lg font-medium leading-6 text-gray-900">
                New message
            </h3>
            <form
                className="max-w-lg mx-auto my-5"
                onSubmit={handleSubmit(handleFormSubmit)}
            >
                <ComboBox control={control} />
                <DataInput
                    label="title"
                    register={register}
                    errors={errors}
                    required={true}
                    multiline={false}
                />
                <DataInput
                    label="message"
                    register={register}
                    errors={errors}
                    required={true}
                    multiline={true}
                />
                <button
                    type="submit"
                    className="inline-flex mx-5 justify-center rounded-md border border-transparent bg-green-100 px-4 py-2 text-sm font-medium text-green-900 hover:bg-green-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2"
                >
                    Send
                </button>
            </form>
        </>
    );
};
export default NewMessageForm;
