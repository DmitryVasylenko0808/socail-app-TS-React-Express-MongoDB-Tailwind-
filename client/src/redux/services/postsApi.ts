import { emptySplitApi } from "./emptySplitApi";
import { Post } from "../../types";
import { 
    GetAllPostsRequest, 
    GetOnePostRequest, 
    CreatePostRequest, 
    RequestEditPost 
} from "../services.types";

export const postsApi = emptySplitApi.injectEndpoints({
    endpoints: builder => ({
        getAllPosts: builder.query<Post[], GetAllPostsRequest>({
            query: ({ limit }) => `posts/limit/${limit}`,
            providesTags: ["Post"]
        }),
        getAllPostsByUserId: builder.query<Post[], string | undefined>({
            query: (id) => `posts/user/${id}`,
            providesTags: ["Post"]
        }),
        getOnePostById: builder.query<Post, GetOnePostRequest>({
            query: ({ userId, postId }) => `posts/user/${userId}/post/${postId}`,
            providesTags: ["Post"]
        }),
        getSavedPosts: builder.query<Post[], null>({
            query: () => "posts/saved",
            providesTags: ["Post"]
        }),
        createPost: builder.mutation<boolean, CreatePostRequest>({
            query: (body) => {
                const formData = new FormData();
                formData.append("text", body.text);
                formData.append("image", body.image);
                 
                return {
                    url: "posts/",
                    method: "POST",
                    body: formData,
                    formData: true
                }
            },
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