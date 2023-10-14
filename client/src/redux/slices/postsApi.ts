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
        }),
        createPost: builder.mutation<boolean, FormData>({
            query: (body) => ({
                url: "posts/",
                method: "POST",
                body,
                formData: true
            })
        })
    })
});

export const { 
    useGetAllPostsQuery, 
    useGetAllPostsByUserIdQuery,
    useCreatePostMutation 
} = postsApi;