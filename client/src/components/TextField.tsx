import React from "react";

type TextFieldProps = {
    id: string,
    type?: string,
    variant?: string,
    children: string,
    value?: string,
    placeholder?: string,
    isInvalid?: boolean,
    error?: string
}

const TextField = ({ id, isInvalid, type, variant, value, placeholder, children, error }: TextFieldProps) => {
    const invalidInput = error || isInvalid ? "border-red-500" : "";
    const errorHelperHidden = !error ? "hidden" : "";

    return (
        <div className="mb-7 flex flex-col">
            <label className="font-bold" htmlFor={id}>{children}</label>
            {variant !== "area" 
                ?  <input 
                    type={type ? type : "text"} 
                    className={`py-1 border-b-4 text-xl focus:outline-none focus:border-stripe-400 caret-stripe-400 ${invalidInput}`} 
                    id={id}
                    defaultValue={value}
                  />
                : <textarea
                    className="w-full min-h-[100px] mb-2 resize-none 
                    py-1 border-b-4 text-xl focus:outline-none focus:border-stripe-400 caret-stripe-400"
                    id={id}
                    placeholder={placeholder}
                    defaultValue={value}
                  />
            }
            <span className={`${errorHelperHidden} text-sm text-red-500`}>{error}</span>
        </div>
    )
};

export default TextField;