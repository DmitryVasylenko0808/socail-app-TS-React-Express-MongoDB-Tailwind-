import React from 'react';
import { useAuth } from '../..';
import { useParams } from 'react-router';
import { useGetOnePostByIdQuery } from '../../redux/slices/postsApi';
import Post from '../../components/Post/Post';
import CommentForm from '../../components/CommentForm';
import CommentsBlock from '../../components/CommentsBlock';
import { useGetAllCommentsByPostIdQuery } from '../../redux/slices/commentsApi';
import CommentsList from '../../components/CommentsList';

const PostPage = () => {
  const isAuthorized = useAuth();
  const { userId, postId } = useParams();

  const { data: post, isLoading: isPostLoading, isSuccess: isPostSuccess } = useGetOnePostByIdQuery({ userId, postId });
  const { data: comments, isLoading: isCommentsLoading, isSuccess: isCommentsSuccess } = useGetAllCommentsByPostIdQuery(postId);

  if (isPostLoading) {
    return <div>Loading...</div>
  }

  return (
    <>
      {isPostSuccess && <Post {...post} />}
      {isPostSuccess &&
        <CommentsBlock countComments={comments ? comments.length : 0}>
          {isAuthorized && <CommentForm postId={postId} />}
          {isCommentsSuccess && <CommentsList comments={comments} />}
        </CommentsBlock>
      }
    </>
  );
}

export default PostPage;