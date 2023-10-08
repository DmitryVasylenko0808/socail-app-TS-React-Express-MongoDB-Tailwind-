import React from "react";
import { Link } from "react-router-dom";

type PostAvatarBlockProps = {
    login: string,
    imageFile?: string
}

const PostAvatarBlock = ({ login, imageFile }: PostAvatarBlockProps) => {
    const path = "http://localhost:5000/static/avatars";

    if (!imageFile) {
        imageFile = `${window.location.origin}/nullavatar.jpg`;
    } else {
        imageFile = `${path}/${imageFile}`;
    }

    return (
        <div className="w-[50px]">
            <Link to={`/profile/${login}`}>
                <img src={imageFile} alt={login} className="min-w-[50px] h-[50px] rounded-full object-cover" />
            </Link>
        </div>
    );
}

export default PostAvatarBlock;