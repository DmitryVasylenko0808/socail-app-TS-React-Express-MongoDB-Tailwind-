import React from "react";
import { MdSentimentVeryDissatisfied } from "react-icons/md";
import { Link } from "react-router-dom";

const NotFoundPage = () => {
    return (
        <div className="h-full min-h-screen flex flex-col justify-center items-center gap-7 text-zinc-500">
            <MdSentimentVeryDissatisfied size={84} />
            <p className="text-2xl text-center">
                Oops... page is not found. Click to return <Link to="/" className="text-stripe-300 underline hover:text-stripe-500">Home</Link>
            </p>
        </div>
    );
};

export default NotFoundPage;