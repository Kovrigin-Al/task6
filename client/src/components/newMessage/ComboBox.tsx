import { Combobox, Transition } from "@headlessui/react";
import { ChevronUpDownIcon, CheckIcon } from "@heroicons/react/20/solid";
import { FC, Fragment, useContext, useState } from "react";
import { Control, Controller } from "react-hook-form";
import { Context } from "../Chat";
import { IFormValues } from "./NewMessageForm";

type Props = {
    control: Control<IFormValues, any>;
};
const ComboBox: FC<Props> = ({ control }) => {
    const { users } = useContext(Context);

    const [query, setQuery] = useState("");
    const filteredPeople =
        query === ""
            ? users
            : users.filter(u =>
                  u
                      .toLowerCase()
                      .replace(/\s+/g, "")
                      .includes(query.toLowerCase().replace(/\s+/g, ""))
              );
    return (
        <Controller
            name="recipient"
            control={control}
            render={({ field }) => (
                <Combobox value={field.value} onChange={field.onChange} >
                    <div className="relative mt-1">
                        <div className="relative w-full cursor-default overflow-hidden rounded-lg bg-white text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-sky-300 sm:text-sm">
                            <Combobox.Input
                                className="w-full  border-none rounded-lg py-2 pl-3 pr-10 text-sm leading-5 text-gray-900 focus:ring-0"
                                displayValue={selected => selected as string}
                                placeholder="Send to ..."
                                required
                                onChange={event => setQuery(event.target.value)}
                            />
                            <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
                                <ChevronUpDownIcon
                                    className="h-5 w-5 text-gray-400"
                                    aria-hidden="true"
                                />
                            </Combobox.Button>
                        </div>
                        <Transition
                            as={Fragment}
                            leave="transition ease-in duration-100"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                            afterLeave={() => setQuery("")}
                        >
                            <Combobox.Options className="absolute mt-1 z-10 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                {filteredPeople.length === 0 && query !== "" ? (
                                    <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
                                        Nothing found.
                                    </div>
                                ) : (
                                    filteredPeople.map(u => (
                                        <Combobox.Option
                                            key={u}
                                            className={({ active }) =>
                                                `relative cursor-default select-none py-2 pl-10 pr-4 ${
                                                    active
                                                        ? "bg-sky-600 text-white"
                                                        : "text-gray-900"
                                                }`
                                            }
                                            value={u}
                                        >
                                            {({ selected, active }) => (
                                                <>
                                                    <span
                                                        className={`block truncate ${
                                                            selected
                                                                ? "font-medium"
                                                                : "font-normal"
                                                        }`}
                                                    >
                                                        {u}
                                                    </span>
                                                    {selected ? (
                                                        <span
                                                            className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                                                                active
                                                                    ? "text-white"
                                                                    : "text-sky-600"
                                                            }`}
                                                        >
                                                            <CheckIcon
                                                                className="h-5 w-5"
                                                                aria-hidden="true"
                                                            />
                                                        </span>
                                                    ) : null}
                                                </>
                                            )}
                                        </Combobox.Option>
                                    ))
                                )}
                            </Combobox.Options>
                        </Transition>
                    </div>
                </Combobox>
            )}
        />
    );
};
export default ComboBox;
