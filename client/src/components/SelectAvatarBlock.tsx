import React, { useState } from "react";

type SelectAvatarBlockProps = {
    id: string,
    imgSrc?: string,
    error?: string
}

const SelectAvatarBlock = ({ id, imgSrc, error }: SelectAvatarBlockProps) => {
    const errorHelperHidden = !error ? "hidden" : "";
    const src = imgSrc ? imgSrc : window.location.origin + "/nullavatar.jpg";

    const [previewAvatar, setPreviewAvatar] = useState<string>(src);

    const showPreviewHandle = (e: React.ChangeEvent, imgFile: FileList | null) => {
        e.preventDefault();

        if (imgFile) {
            const reader = new FileReader();
            reader.addEventListener("load", () => {
                if (typeof reader.result === "string") {
                    setPreviewAvatar(reader.result);
                }
            });
            reader.readAsDataURL(imgFile[0]);
        }
    }

    return (
        <div className="mb-7">
            <label className="font-bold inline-block" htmlFor={id}>Avatar</label>
            <div className="py-1 flex items-center gap-x-6">
                <img src={previewAvatar} alt="avatar" className="w-[70px] h-[70px] rounded-full" />
                <div className="flex-1 flex flex-col">
                    <input
                        type="file"
                        className="py-1 text-zinc-500 cursor-pointer focus:outline-none hover:file:bg-stripe-100
                        file:mr-2 file:py-2 file:px-4 file:bg-inherit file:border file:border-stripe-500 file:rounded-full file:font-bold file:text-stripe-500 file:hover:cursor-pointer"
                        id={id}
                        onChange={(e) => showPreviewHandle(e, e.target.files)}
                    />
                    <span className={`${errorHelperHidden} text-sm text-red-500`}>{error}</span>
                </div>
            </div>
        </div>
    )
};

export default SelectAvatarBlock;