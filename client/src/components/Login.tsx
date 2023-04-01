import { FC, useState } from "react";

type Props = {
    onNameSumbit: any
};
const Login:FC <Props> = ({onNameSumbit}) => {
    const [value, setValue] = useState("");
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value);
    };
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        onNameSumbit(value )
    };
    return (
        <div className="flex justify-center items-center h-screen w-screen">
            <form className="w-full max-w-sm " onSubmit={handleSubmit}>
                <div className="flex justify-center mb-6">
                    <input
                        className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-sky-500"
                        type="text"
                        value={value}
                        onChange={handleChange}
                        placeholder="Enter your name"
                    />
                </div>
                <div className="flex justify-center">
                    <button
                        className={`${
                            value.length === 0
                                ? "pointer-events-none bg-sky-400 "
                                : "hover:bg-sky-400 focus:shadow-outline focus:outline-none bg-sky-500 "
                        } text-white shadow  font-bold py-2 px-4 rounded`}
                        type="submit"
                    >
                        Login
                    </button>
                </div>
            </form>
        </div>
    );
};
export default Login;
