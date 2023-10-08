import React from "react";
import { Link } from "react-router-dom";

type PostHeaderProps = {
    name: string,
    login: string,
    postDate: string,
    postUpdatedDate: string
}

const PostHeader = ({ name, login, postDate, postUpdatedDate }: PostHeaderProps) => {
    let date: string | string[] = postDate.split(/-|:|T/);
    date = `${date[2]}-${date[1]}-${date[0]} ${date[3]}:${date[4]}`;
    
    return (
        <div className="mb-1 flex items-center gap-x-2">
            <Link to={`/profile/${login}`} className="text-xl font-bold">{name}</Link>
            <Link to={`/profile/${login}`} className="text-zinc-500">{`@${login}`}</Link>
            <span className="text-zinc-500">{date}</span>
        </div>
    );
}

export default PostHeader;