import React from "react";

type TextFieldProps = {
    id: string,
    type?: string,
    children: string,
    isInvalid?: boolean,
    error?: string
}

const TextField = ({ id, isInvalid, type, children, error }: TextFieldProps) => {
    const invalidInput = error || isInvalid ? "border-red-500" : "";
    const errorHelperHidden = !error ? "hidden" : "";

    return (
        <div className="mb-7 flex flex-col">
            <label className="font-bold" htmlFor={id}>{children}</label>
            <input 
                type={type ? type : "text"} 
                className={`py-1 border-b-4 text-xl focus:outline-none focus:border-stripe-400 caret-stripe-400 ${invalidInput}`} 
                id={id}
            />
            <span className={`${errorHelperHidden} text-sm text-red-500`}>{error}</span>
        </div>
    )
};

export default TextField;