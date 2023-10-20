import React from "react";

type SwitcherProps = {
    checked: boolean;
    labels?: {
        first: string | React.ReactNode;
        last: string | React.ReactNode;
    }
    onChange: () => void;
}

const Switcher = ({ checked, labels, onChange }: SwitcherProps) => {
    return (
        <div className="w-[150px] flex justify-between items-center text-zinc-500">
            {labels?.first}
            <label className="w-[68px] h-[34px] relative inline-block border-2 border-stripe-400 rounded-3xl">
                <input
                    className="w-0 h-0 opacity-0 peer"
                    type="checkbox"
                    onChange={onChange}
                    checked={checked}
                    aria-label="theme"
                />
                <span className="absolute cursor-pointer top-0 left-0 right-0 bottom-0 duration-200
              before:absolute before:content=[''] before:w-[26px] before:h-[26px] before:top-[2px] 
              before:left-[2px] before:rounded-full before:bg-stripe-400 before:duration-200
              peer-checked:before:translate-x-[34px]"
                />
            </label>
            {labels?.last}
        </div>
    )
}

export default Switcher;