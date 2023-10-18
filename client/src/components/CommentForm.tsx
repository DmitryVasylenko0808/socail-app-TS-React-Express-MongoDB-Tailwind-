import React, { useState } from "react";
import TextField from "./TextField";
import { useAddCommentMutation } from "../redux/slices/commentsApi";

type CommentFormProps = {
    postId?: string
}

type AddPostFormFields = {
    text: { value: string }
}

type AddCommentError = {
    path: string,
    message: string
}

const CommentForm = ({ postId }: CommentFormProps) => {
    const [error, setError] = useState<AddCommentError | null>(null);

    const [addPost, { isLoading }] = useAddCommentMutation();

    const addPostHandle = async (e: React.SyntheticEvent) => {
        e.preventDefault();

        const target = e.target as typeof e.target & AddPostFormFields;
        const data = {
            postId,
            text: target.text.value
        };

        addPost(data)
            .unwrap()
            .then(() => { setError(null) })
            .catch(err => { setError({ ...err.data }) });
    }

    const isExistErrorField = (path: string): string | undefined => {
        return error?.path === path ? error?.message : undefined;
    }

    return (
        <form onSubmit={addPostHandle}>
            <TextField
                id="text"
                variant="area"
                placeholder="Write a comment for the post..."
                error={isExistErrorField("text")}
            />
            <div className="flex justify-end">
                <button
                    type="submit"
                    className="w-[200px] py-3 bg-stripe-400 rounded-full text-white font-bold hover:bg-stripe-500 
                    disabled:opacity-50 disabled:cursor-auto hover:disabled:bg-stripe-400"
                    disabled={isLoading}
                >
                    {isLoading ? "Loading..." : "Comment"}
                </button>
            </div>
        </form>
    )
}

export default CommentForm;