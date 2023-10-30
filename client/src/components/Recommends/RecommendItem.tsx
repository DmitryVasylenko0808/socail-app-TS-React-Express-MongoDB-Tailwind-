import React from "react";
import { Link } from "react-router-dom";

type RecommendItemProps = {
    _id: string,
    login: string,
    name: string,
    avatar_file?: string
}

const RecommendItem = ({ _id, login, name, avatar_file }: RecommendItemProps) => {
    const path = "http://localhost:5000/static/avatars";

    let imageSrc;
    if (!avatar_file) {
        imageSrc = `${window.location.origin}/nullavatar.jpg`;
    } else {
        imageSrc = `${path}/${avatar_file}`;
    }

    return (
        <div className="py-4 flex items-center gap-x-2">
            <Link to={`/profile/${login}`} className="">
                <img src={imageSrc} alt="avatar" className="w-[50px] h-[50px] rounded-full object-cover" />
            </Link>
            <div className="flex-auto flex flex-col">
                <Link to={`/profile/${login}`} className="text-lg font-bold dark:text-white">{name}</Link>
                <Link to={`/profile/${login}`} className="text-zinc-500">{`@${login}`}</Link>
            </div>
        </div>
    );
}

export default RecommendItem;