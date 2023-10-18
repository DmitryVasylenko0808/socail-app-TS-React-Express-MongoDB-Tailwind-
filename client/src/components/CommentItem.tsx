import React from "react";
import { Link } from "react-router-dom";
import { Comment } from "../types";
import { MdDeleteOutline } from "react-icons/md";
import { useRemoveCommentMutation } from "../redux/slices/commentsApi";

type CommentItemProps = Comment & { isAuthor: boolean };

const CommentItem = ({ _id, user, post, text, createdAt, isAuthor }: CommentItemProps) => {
    let date: string | string[] = createdAt.split(/-|:|T/);
    date = `${date[2]}-${date[1]}-${date[0]} ${date[3]}:${date[4]}`;

    const path = "http://localhost:5000/static/avatars";
    let imageFile;
    if (!user.avatar_file) {
        imageFile = `${window.location.origin}/nullavatar.jpg`;
    } else {
        imageFile = `${path}/${user.avatar_file}`;
    }

    const [removeComment, { isSuccess }] = useRemoveCommentMutation();

    const removeCommentHandle = async () => {
        await removeComment({ postId: post, commentId: _id });
    }

    return (
        <div className="py-4 flex gap-x-4">
            <div className="w-[50px]">
                <Link to={`/profile/${user.login}`}>
                    <img 
                        src={imageFile} 
                        alt={user.login} 
                        className="min-w-[50px] h-[50px] rounded-full object-cover"
                    />
                </Link>
            </div>
            <div className="flex-auto">
                <div className="flex justify-between">
                    <div className="mb-1 flex items-center gap-x-2">
                        <Link className="text-xl font-bold" to={`/profile/${user.login}`}>{user.name}</Link>
                        <Link className="text-zinc-500" to={`/profile/${user.login}`}>{`@${user.login}`}</Link>
                        <span className="text-zinc-500">{date}</span>
                    </div>
                    {isAuthor && 
                        <button 
                            onClick={removeCommentHandle} 
                            className="flex gap-x-1 items-center text-zinc-500"
                        >
                            <MdDeleteOutline size={20} />
                            Remove
                        </button>
                    }
                </div>
                <div className="break-all">
                    <p className="mb-4 text-zinc-500">
                        {text}
                    </p>
                </div>
            </div>
        </div>
    )
};

export default CommentItem;