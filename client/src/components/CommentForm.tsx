import React from "react";
import TextField from "./TextField";

const CommentForm = () => {
    return (
        <form className="">
            <TextField
                id="text"
                variant="area"
                placeholder="Write a comment for the post..."
            />
            <div className="flex justify-end">
                <button
                    type="submit"
                    className="w-[200px] py-3 bg-stripe-400 rounded-full text-white font-bold hover:bg-stripe-500 
                  disabled:opacity-50 disabled:cursor-auto hover:disabled:bg-stripe-400"
                >
                    Comment
                </button>
            </div>
        </form>
    )
}

export default CommentForm;