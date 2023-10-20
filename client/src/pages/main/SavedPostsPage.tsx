import React from 'react';
import { useGetSavedPostsQuery } from '../../redux/services/postsApi';
import PostsList from '../../components/Lists/PostsList';

const SavedPostsPage = () => {
  const { data: savedPosts, isLoading, isSuccess } = useGetSavedPostsQuery(null);

  if (isLoading) {
    return <div>Loading...</div>
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