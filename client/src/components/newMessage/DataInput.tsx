import { FieldErrors, Path, UseFormRegister } from "react-hook-form";
import { IFormValues } from "./NewMessageForm";

type InputProps = {
    label: Path<IFormValues>;
    register: UseFormRegister<IFormValues>;
    required: boolean;
    multiline: boolean;
    errors: FieldErrors<IFormValues>;
};
const DataInput = ({
    label,
    register,
    required,
    errors,
    multiline,
}: InputProps) => {
    const props = {
        placeholder: label,
        className:
            "w-full  border-none rounded-lg py-2 pl-3 pr-10 text-sm leading-5 text-gray-900 focus:ring-0",
        ...register(label, { required }),
    };
    return (
        <div className="relative w-full cursor-default overflow-hidden rounded-lg my-2 bg-white text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-sky-300 sm:text-sm">
            {multiline ? <textarea {...props} /> : <input {...props} />}
            {errors[label] && (
                <span className="text-xs text-red-500">
                    {label} is required
                </span>
            )}
        </div>
    );
};
export default DataInput;
