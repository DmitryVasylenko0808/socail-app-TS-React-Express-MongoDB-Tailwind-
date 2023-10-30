import React from 'react';
import { useGetSavedPostsQuery } from '../../redux/services/postsApi';
import PostsList from '../../components/Lists/PostsList';
import Loader from '../../components/Loader';

const SavedPostsPage = () => {
  const { data: savedPosts, isLoading, isSuccess } = useGetSavedPostsQuery(null);

  if (isLoading) {
    return (
      <div className="py-12 flex justify-center">
        <Loader size="big" variant="stripe" />
      </div>
    )
  }

  return (
    <>
      {isSuccess && savedPosts?.length 
        ? <PostsList posts={savedPosts} />
        : <div>No one post is not saved</div>}
    </>
  );
}

export default SavedPostsPage;