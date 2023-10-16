import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Post } from "../../types";
import { emptySplitApi } from "./emptySplitApi";

type RequestEditPost = {
    postId: string,
    text: string,
    image_file: string
}

export const postsApi = emptySplitApi.injectEndpoints({
    endpoints: builder => ({
        getAllPosts: builder.query<Post[], { limit: number, skip: number }>({
            query: ({ limit, skip }) => `posts/limit/${limit}/skip/${skip}`,
            providesTags: ["Post"]
        }),
        getAllPostsByUserId: builder.query<Post[], string | undefined>({
            query: (id) => `posts/user/${id}`,
            providesTags: ["Post"]
        }),
        getOnePostById: builder.query<Post, { userId: string, postId: string }>({
            query: ({ userId, postId }) => `posts/user/${userId}/post/${postId}`,
            providesTags: ["Post"]
        }),
        getSavedPosts: builder.query<Post[], null>({
            query: () => "posts/saved",
            providesTags: ["Post"]
        }),
        createPost: builder.mutation<boolean, FormData>({
            query: (body) => ({
                url: "posts/",
                method: "POST",
                body,
                formData: true
            }),
            invalidatesTags: ["Post"]
        }),
        editPost: builder.mutation<boolean, RequestEditPost>({
            query: ({ postId, text, image_file }) => {
                const formData = new FormData();
                formData.append("text", text);
                formData.append("image_file", image_file);

                return {
                    url: `posts/${postId}`,
                    method: "PATCH",
                    body: formData,
                    formData: true
                }
            },
            invalidatesTags: ["Post"]
        }),
        deletePost: builder.mutation<boolean, string>({
            query: (postId) => ({
                url: `posts/${postId}`,
                method: "DELETE"
            }),
            invalidatesTags: ["Post"]
        }),
        likePost: builder.mutation<boolean, string>({
            query: (postId) => ({
                url: `posts/like/${postId}`,
                method: "PATCH"
            }),
            invalidatesTags: ["Post"]
        }),
        savePost: builder.mutation<boolean, string>({
            query: (postId) => ({
                url: `posts/save/${postId}`,
                method: "PATCH"
            }),
            invalidatesTags: ["Post"]
        })
    })
});

export const { 
    useGetAllPostsQuery, 
    useGetAllPostsByUserIdQuery,
    useGetOnePostByIdQuery,
    useGetSavedPostsQuery,
    useCreatePostMutation,
    useEditPostMutation,
    useDeletePostMutation,
    useLikePostMutation,
    useSavePostMutation 
} = postsApi;