import React from "react";
import { MdOutlineImage } from "react-icons/md";

const PostForm = () => {
    return (
        <form className="mb-8">
            <textarea
                className="w-full min-h-[100px] mb-2 resize-none 
                py-1 border-b-4 text-xl focus:outline-none focus:border-stripe-400 caret-stripe-400"
                aria-label="text"
                id="text"
                placeholder="Your text for post..."
            />
            
            <div className="flex justify-between">
                <label
                    className="py-2 px-4 inline-flex items-center gap-x-3 border border-stripe-500 rounded-full 
                    font-bold text-stripe-500 cursor-pointer hover:bg-stripe-100"
                    htmlFor="image"
                >
                    <MdOutlineImage size={24} />
                    Upload Image
                    <input
                        type="file"
                        className="hidden"
                        id="image"
                    />
                </label>
                <button
                    type="submit"
                    className="w-[200px] py-3 bg-stripe-400 rounded-full text-white font-bold hover:bg-stripe-500 
                    disabled:opacity-50 disabled:cursor-auto hover:disabled:bg-stripe-400"
                    disabled={false}
                >
                    Post
                </button>
            </div>
        </form>
    );
}

export default PostForm;