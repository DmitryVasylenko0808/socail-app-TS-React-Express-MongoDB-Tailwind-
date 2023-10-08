import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Post } from "../../types";
import { emptySplitApi } from "./emptySplitApi";

export const postsApi = emptySplitApi.injectEndpoints({
    endpoints: builder => ({
        getAllPosts: builder.query<Post[], { limit: number, skip: number }>({
            query: ({ limit, skip }) => `posts/limit/${limit}/skip/${skip}`
        }),
        getAllPostsByUserId: builder.query<Post[], string | undefined>({
            query: (id) => `posts/user/${id}`
        })
    })
});

export const { useGetAllPostsQuery, useGetAllPostsByUserIdQuery } = postsApi;