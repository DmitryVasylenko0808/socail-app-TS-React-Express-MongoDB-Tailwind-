import React from "react";
import Post from "./Post/Post";
import { Comment } from "../types";
import CommentItem from "./CommentItem";
import { useAppSelector } from "../redux/hooks";

type CommentsListProps = {
    comments: Comment[] | undefined;
}

const CommentsList = ({ comments }: CommentsListProps) => {
    const authUser = useAppSelector(state => state.auth);
    return (
        <div>
            {comments?.map(comment => 
                <CommentItem 
                    {...comment} 
                    isAuthor={authUser.login === comment.user.login} 
                    key={comment._id} 
                />
            )}
        </div>
    )
}

export default CommentsList;