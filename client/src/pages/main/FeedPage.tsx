import React, { useEffect, useState } from 'react';
import PostsList from '../../components/PostsList';
import { useGetAllPostsQuery } from '../../redux/slices/postsApi';
import { Post } from '../../types';

const FeedPage = () => {
  const limit = 5;
  const [postsFeed, setPostsFeed] = useState<Post[]>([]);
  const [skip, setSkip] = useState<number>(0);

  let { data, isError, isLoading, isFetching } = useGetAllPostsQuery({ limit, skip });

  useEffect(() => {
    if (!isFetching && data) {
      setPostsFeed([...postsFeed, ...data]);
    }
  }, [isFetching]);
  
  const loadMoreHandler = () => {
    setSkip(skip + 1);
  }

  if (isLoading) return <div>Loading...</div>;

  return (
    <>
      <PostsList posts={postsFeed} />
      {!isLoading &&  
        <button onClick={loadMoreHandler} className="w-full py-3 bg-stripe-400 rounded-full font-bold text-white hover:bg-stripe-500">
          {isFetching ? "Refetching..." : "Load more"}
        </button>}
    </>
  );
}

export default FeedPage;