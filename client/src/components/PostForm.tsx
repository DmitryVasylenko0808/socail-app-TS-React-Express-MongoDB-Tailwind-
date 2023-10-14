import React, { useState } from "react";
import TextField from "./TextField";
import { MdOutlineImage } from "react-icons/md";
import { useCreatePostMutation } from "../redux/slices/postsApi";

type CreateError = {
    path: string,
    message: string
}

type CreatePostFormFields = {
    text: { value: string },
    image: { files: string }
}

const PostForm = () => {
    const [error, setError] = useState<CreateError | null>(null);
    const [previewImage, setPreviewImage] = useState<string>("");

    const [createPost, { isLoading }] = useCreatePostMutation();

    const createPostHandle = async (e: React.SyntheticEvent) => {
        e.preventDefault();

        const target = e.target as typeof e.target & CreatePostFormFields;
        const data = {
            text: target.text.value,
            image: target.image.files[0]
        };

        const formData = new FormData();
        formData.append("text", data.text);
        formData.append("image", data.image);

        await createPost(formData).unwrap()
            .catch(err => { setError({ ...err.data }) });
    }

    const showPreviewHandle = (e: React.ChangeEvent, imgFile: FileList | null) => {
        e.preventDefault();

        if (imgFile) {
            const reader = new FileReader();
            reader.addEventListener("load", () => {
                if (typeof reader.result === "string") {
                    setPreviewImage(reader.result);
                }
            });
            reader.readAsDataURL(imgFile[0]);
        }
    }   

    const isExistErrorField = (path: string): string | undefined => {
        return error?.path === path ? error?.message : undefined;
    }

    return (
        <form onSubmit={createPostHandle} className="mb-8">
            <TextField 
                id="text" 
                variant="area"
                placeholder="Your text for post..."
                error={isExistErrorField("text")}
            />

            {previewImage && 
                <div className="w-full mb-3 flex justify-center">
                    <img src={previewImage} alt="Preview image" className="max-h-[420px] rounded-lg" />
                </div>}
            
            <div className="flex justify-between">
                <label
                    className="py-2 px-4 inline-flex items-center gap-x-3
                    font-bold text-stripe-500 cursor-pointer"
                    htmlFor="image"
                >
                    <MdOutlineImage size={24} />
                    Upload Image
                    <input
                        type="file"
                        className="hidden"
                        id="image"
                        onChange={e => showPreviewHandle(e, e.target.files)}
                    />
                    {isExistErrorField("image") && <span className={`text-sm text-red-500`}>{error?.message}</span>}
                </label>
                <button
                    type="submit"
                    className="w-[200px] py-3 bg-stripe-400 rounded-full text-white font-bold hover:bg-stripe-500 
                    disabled:opacity-50 disabled:cursor-auto hover:disabled:bg-stripe-400"
                    disabled={isLoading}
                >
                    {isLoading ? "Loading..." : "Post"}
                </button>
            </div>
        </form>
    );
}

export default PostForm;