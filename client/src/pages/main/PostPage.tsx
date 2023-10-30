import React from 'react';
import { useAuth } from '../..';
import { Navigate, useParams } from 'react-router';
import { useGetOnePostByIdQuery } from '../../redux/services/postsApi';
import { useGetAllCommentsByPostIdQuery } from '../../redux/services/commentsApi';
import Post from '../../components/Post/Post';
import CommentForm from '../../components/Forms/CommentForm';
import CommentsBlock from '../../components/CommentsBlock';
import CommentsList from '../../components/Lists/CommentsList';
import Loader from '../../components/Loader';

const PostPage = () => {
  const isAuthorized = useAuth();
  const { userId, postId } = useParams();

  const { data: post, isLoading: isPostLoading, isSuccess: isPostSuccess, error: postError } = useGetOnePostByIdQuery({ userId, postId });
  const { data: comments, isLoading: isCommentsLoading, isSuccess: isCommentsSuccess } = useGetAllCommentsByPostIdQuery(postId, { skip: !!postError });

  if (isPostLoading) {
    return (
      <div className="py-12 flex justify-center">
        <Loader size="big" variant="stripe" />
      </div>
    )
  }

  if (postError && "status" in postError && postError.status === 404) {
    return <Navigate to="*" />;
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