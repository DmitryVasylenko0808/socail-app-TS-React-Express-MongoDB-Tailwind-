import React from "react";
import { Link } from "react-router-dom";

type PostBodyProps = {
    text: string,
    authorId: string,
    postId: string,
    imageFile?: string
}

const PostBody = ({ text, authorId, postId, imageFile }: PostBodyProps) => {
    const path = "http://localhost:5000/static/posts";
    return (
        <div className="break-all">
            <p className="mb-4 text-zinc-500">
                {text} <Link to={`/post/${authorId}/${postId}`} className="text-stripe-300 underline hover:text-stripe-500">Read more</Link>
            </p>
            
            {imageFile && 
                <div className="w-full flex justify-center">
                    <img src={`${path}/${imageFile}`} alt={imageFile} className="max-h-[420px] rounded-lg" />
                </div>} 
        </div>
    );
}

export default PostBody;