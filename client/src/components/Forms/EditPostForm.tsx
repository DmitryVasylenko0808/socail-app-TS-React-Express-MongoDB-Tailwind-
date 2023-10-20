import React, { useEffect, useState } from "react";
import TextField from "../TextField";
import { useEditPostMutation, useGetOnePostByIdQuery } from "../../redux/services/postsApi";
import { MdOutlineImage } from "react-icons/md";
import Loader from "../Loader";

type EditPostFormProps = {
    userId: string,
    postId: string
}

type EditFormFields = {
    text: { value: string },
    image_file: { files: string }
}

type EditError = {
    path: string,
    message: string
}

const EditPostForm = ({ userId, postId }: EditPostFormProps) => {
    const [previewPostImage, setPreviewPostImage] = useState<string>("");
    const [error, setError] = useState<EditError | null>(null);

    const { data: post, isLoading: isPostLoading } = useGetOnePostByIdQuery({ userId, postId });
    const [editPost, { isLoading: isEditPostLoading }] = useEditPostMutation();

    useEffect(() => {
        if (post?.image) {
            setPreviewPostImage(`http://localhost:5000/static/posts/${post.image}`);
        }
    }, [isPostLoading]);

    const showPreviewHandle = (e: React.ChangeEvent, imgFile: FileList | null) => {
        e.preventDefault();

        if (imgFile) {
            const reader = new FileReader();
            reader.addEventListener("load", () => {
                if (typeof reader.result === "string") {
                    setPreviewPostImage(reader.result);
                }
            });
            reader.readAsDataURL(imgFile[0]);
        }
    } 

    const editPostHandle = async (e: React.SyntheticEvent) => {
        e.preventDefault();

        const target = e.target as typeof e.target & EditFormFields;
        const data = {
            text: target.text.value,
            image_file: target.image_file.files[0]
        };

        await editPost({ postId, ...data })
            .unwrap()
            .then(() => { setError(null) })
            .catch(err => { setError({ ...err.data }) });
    }

    const isExistErrorField = (path: string): string | undefined => {
        return error?.path === path ? error?.message : undefined;
    }

    if (isPostLoading) {
        return <div>Loading...</div>
    }

    return (
        <form onSubmit={editPostHandle}>
            <TextField
                id="text"
                variant="area"
                value={post?.text}
                error={isExistErrorField("text")}
            >
                Text
            </TextField>
            <label
                className="py-2 inline-flex items-center gap-x-3
                font-bold text-stripe-500 cursor-pointer"
                htmlFor="image_file"
            >
                <MdOutlineImage size={24} />
                {previewPostImage ? "Change image" : "Upload Image"}
                <input
                    type="file"
                    className="hidden"
                    id="image_file"
                    onChange={e => showPreviewHandle(e, e.target.files)}
                />
                {isExistErrorField("image_file") && <span className={`text-sm text-red-500`}>{error?.message}</span>}
            </label>

            {previewPostImage
                ? <div className="w-full mb-7 flex justify-center">
                    <img
                        src={previewPostImage}
                        alt="Preview image"
                        className="max-h-[420px] rounded-lg"
                    />
                  </div>
                : null
            }

            <button
                type="submit"
                className="w-full py-3 bg-stripe-400 rounded-full flex justify-center text-white font-bold hover:bg-stripe-500 
                disabled:opacity-50 disabled:cursor-auto hover:disabled:bg-stripe-400"
                disabled={isEditPostLoading}
            >
                {isEditPostLoading ? <Loader size="normal" variant="white" /> : "Edit Post"}
            </button>
        </form>
    );
}

export default EditPostForm;