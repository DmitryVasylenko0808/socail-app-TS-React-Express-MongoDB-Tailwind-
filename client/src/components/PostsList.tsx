import React from "react";
import Post from "./Post/Post";
import { Post as PostType } from "../types";

type PostsListProps = {
    posts: PostType[] | undefined;
}

const PostsList = ({ posts }: PostsListProps) => {
    return (
        <>
            {posts?.map(post => <Post {...post} key={post._id} />)}
        </>
    )
}

export default PostsList;