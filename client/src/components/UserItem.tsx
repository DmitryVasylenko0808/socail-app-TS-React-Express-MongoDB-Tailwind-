import React from "react";
import { Link } from "react-router-dom";

type UserItemProps = {
    _id: string,
    name: string,
    login: string,
    avatar_file?: string,
    isOwnFollower?: boolean,
    isOwnFollowing?: boolean
    remove: (id: string) => Promise<void>
}

const UserItem = ({ _id, name, login, avatar_file, isOwnFollower, isOwnFollowing, remove }: UserItemProps) => {
    const path = "http://localhost:5000/static/avatars";

    let imageSrc;
    if (!avatar_file) {
        imageSrc = `${window.location.origin}/nullavatar.jpg`;
    } else {
        imageSrc = `${path}/${avatar_file}`;
    }

    return (
        <div className="py-6 border-b-2 flex items-center gap-x-4 dark:border-slate-700">
            <Link to={`/profile/${login}`} className="">
                <img src={imageSrc} alt="avatar" className="w-[75px] h-[75px] rounded-full object-cover" />
            </Link>
            <div className="flex-auto flex flex-col">
                <Link to={`/profile/${login}`} className="text-xl font-bold dark:text-white">{name}</Link>
                <Link to={`/profile/${login}`} className="text-zinc-500">{`@${login}`}</Link>
            </div>
            {isOwnFollower && 
                <button 
                    onClick={() => remove(_id)}
                    className="w-[150px] h-[48px] bg-zinc-200 rounded-full font-bold hover:bg-zinc-300 
                    dark:bg-slate-800 dark:text-white dark:hover:bg-slate-900"
                >
                    Delete
                </button>}
            {isOwnFollowing && 
                <button
                    onClick={() => remove(_id)}
                    className="w-[150px] h-[48px] bg-zinc-200 rounded-full font-bold hover:bg-zinc-300 
                    dark:bg-slate-800 dark:text-white dark:hover:bg-slate-900"
                >
                    Unfollow
                </button>}
        </div>
    )
};

export default UserItem;