import React from "react";
import { HiDotsHorizontal } from "react-icons/hi";
import { MdEdit, MdDeleteOutline } from "react-icons/md";

type PostMenuProps = {
    onEdit: () => void,
    onDelete: () => void
}

const PostMenu = ({ onEdit, onDelete }: PostMenuProps) => {
    return (
        <div className="group relative text-zinc-500 cursor-pointer h-max">
            <HiDotsHorizontal size={26} />
            <div className="hidden group-hover:block absolute top-[16px] right-[8px] bg-white border rounded-lg shadow-xl text-lg dark:bg-slate-900 dark:border-none">
                <button onClick={onEdit} className="w-[130px] h-[46px] px-3 flex items-center gap-x-2 border-b dark:border-slate-700 hover:bg-zinc-100 dark:hover:bg-slate-800">
                    <MdEdit size={20} />
                    Edit
                </button>
                <button onClick={onDelete} className="w-[130px] h-[46px] px-3 flex items-center gap-x-2 hover:bg-zinc-100 dark:hover:bg-slate-800">
                    <MdDeleteOutline size={20} />
                    Delete
                </button>
            </div>
        </div>
    );
}

export default PostMenu;