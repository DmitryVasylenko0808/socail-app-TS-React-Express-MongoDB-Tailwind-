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
    authorId: string,
    postId: string,
    comments_count: number,
    likes: { user: string }[],
    saves: { user: string }[],
    isLiked: boolean,
    isSaved: boolean,
    onLike: () => Promise<void>,
    onSave: () => Promise<void>,
}

const PostFooter = ({ authorId, postId, comments_count, likes, saves, isLiked, isSaved, onLike, onSave }: PostFooterProps) => {
    return (
        <div className="p-4 flex justify-between text-zinc-500">
            <Link to={`/post/${authorId}/${postId}`} className="w-[100px] flex items-center gap-x-2">
                <MdOutlineModeComment size={26} />
                {comments_count}
            </Link>
            <button onClick={onLike} disabled={isLiked} className="w-[100px] flex items-center gap-x-2">
                {isLiked ? <MdOutlineFavorite size={26} /> : <MdOutlineFavoriteBorder size={26} />}
                {likes.length}
            </button>
            <button onClick={onSave} disabled={isSaved} className="w-[100px] flex items-center gap-x-2">
                {isSaved ? <MdOutlineBookmark size={26} /> : <MdBookmarkBorder size={26} />}
                {saves.length}
            </button>
        </div>
    );
}

export default PostFooter;