import React, { useEffect, useState } from 'react';
import { useGetAllPostsQuery } from '../../redux/services/postsApi';
import { useSearchParams } from 'react-router-dom';
import PostsList from '../../components/Lists/PostsList';
import Loader from '../../components/Loader';

const FeedPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    setSearchParams({ limit: "10" }, { replace: true });
  }, []);

  const { data, isError, isLoading, isFetching } = useGetAllPostsQuery({ limit: parseFloat(searchParams.get("limit") as string) }, { skip: !searchParams.get("limit") });
  
  const loadMoreHandle = () => {
    if (searchParams.get("limit")) {
      const prev = parseFloat(searchParams.get("limit") as string);
      const next = prev + 10;
      setSearchParams({ limit: next.toString() }, { replace: true });
    }
  }

  if (isLoading) return (
    <div className="py-12 flex justify-center">
      <Loader size="big" variant="stripe" />
    </div>
  );

  return (
    <>
      <PostsList posts={data} />
      {!isLoading &&  
        <button 
          onClick={loadMoreHandle} 
          className="w-full py-3 bg-stripe-400 rounded-full flex justify-center font-bold text-white hover:bg-stripe-500
          disabled:opacity-50 disabled:cursor-auto hover:disabled:bg-stripe-400"
          disabled={isFetching}
        >
          {isFetching ? <Loader size="normal" variant="white" /> : "Load more"}
        </button>}
    </>
  );
}

export default FeedPage;