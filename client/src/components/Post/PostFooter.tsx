import React from "react";
import {
    MdOutlineModeComment,
    MdOutlineFavoriteBorder,
    MdOutlineFavorite,
    MdBookmarkBorder,
    MdOutlineBookmark
} from "react-icons/md"
import { User } from "../../types";
import { Link } from "react-router-dom";

type PostFooterProps = {
    comments_count: number,
    likes: User[],
    saves: User[]
}

const PostFooter = ({ comments_count, likes, saves }: PostFooterProps) => {
    return (
        <div className="p-4 flex justify-between text-zinc-500">
            <Link to={`/`} className="w-[100px] flex items-center gap-x-2">
                <MdOutlineModeComment size={26} />
                {comments_count ? 0 : comments_count}
            </Link>
            <button className="w-[100px] flex items-center gap-x-2">
                <MdOutlineFavoriteBorder size={26} />
                {likes.length}
            </button>
            <button className="w-[100px] flex items-center gap-x-2">
                <MdBookmarkBorder size={26} />
                {saves.length}
            </button>
        </div>
    );
}

export default PostFooter;