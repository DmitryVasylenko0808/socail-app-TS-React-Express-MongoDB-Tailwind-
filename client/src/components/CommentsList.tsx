import React from "react";
import Post from "./Post/Post";
import { Comment } from "../types";
import CommentItem from "./CommentItem";

type CommentsListProps = {
    comments: Comment[] | undefined;
}

const CommentsList = ({ comments }: CommentsListProps) => {
    console.log(comments);
    return (
        <>
            {comments?.map(comment => <CommentItem {...comment} key={comment._id} />)}
        </>
    )
}

export default CommentsList;