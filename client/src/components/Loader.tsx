import React from "react";

type LoaderProps = {
    size: "normal" | "big";
    variant: "stripe" | "white";
}

const Loader = ({ variant, size }: LoaderProps) => {
    let sizeLoader;
    if (size === "normal") {
        sizeLoader = "h-[24px] w-[24px]";
    } else if (size === "big") {
        sizeLoader = "h-[56px] w-[56px]";
    }

    let borderColor;
    if (variant === "stripe") {
        borderColor = "border-stripe-400";
    } else if (variant === "white") {
        borderColor = "border-white"
    }

    return (
        <div className={`${sizeLoader} rounded-full border-2 ${borderColor} border-x-transparent animate-spin`} />
    );
}

export default Loader;