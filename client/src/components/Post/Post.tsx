import React from "react";
import { HiDotsHorizontal } from "react-icons/hi";
import PostAvatarBlock from "./PostAvatarBlock";
import PostHeader from "./PostHeader";
import PostBody from "./PostBody";
import PostFooter from "./PostFooter";
import { Post as PostType } from "../../types";

type PostProps = PostType;

const Post = ({ _id, user, text, image_file, comments_count, likes_list, saves_list, createdAt, updatedAt }: PostProps) => {
    return (
        <article className="py-4 flex gap-x-4">
            <PostAvatarBlock login={user.login} imageFile={user.avatar_file} />

            <div className="flex-auto">
                <PostHeader 
                    name={user.name} 
                    login={user.login} 
                    postDate={createdAt} 
                    postUpdatedDate={updatedAt} 
                />
                <PostBody text={text} imageFile={image_file}/>
                <PostFooter 
                    comments_count={comments_count} 
                    likes={likes_list} 
                    saves={saves_list} 
                />
            </div>

            {/* <div className="text-zinc-500">
                <HiDotsHorizontal size={26} />
            </div> */}
        </article>
    );
}

export default Post;