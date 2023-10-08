import React from "react";
import { Link } from "react-router-dom";

type PostBodyProps = {
    text: string,
    imageFile?: string
}

const PostBody = ({ text, imageFile }: PostBodyProps) => {
    const path = "http://localhost:5000/static/posts";
    return (
        <div className="break-all">
            <p className="mb-4 text-zinc-500">
                {text} <Link to="/" className="text-stripe-300 underline hover:text-stripe-500">Read more</Link>
            </p>
            {imageFile && <img src={`${path}/${imageFile}`} alt={imageFile} className="w-full max-h-[420px] rounded-lg" />} 
        </div>
    );
}

export default PostBody;