import { emptySplitApi } from "./emptySplitApi";

type GetCommentsResponse = Comment[];

type AddCommentRequest = {
    postId?: string,
    text: string
}

type RemoveCommentRequest = {
    postId?: string,
    commentId?: string
}

export const commentsApi = emptySplitApi.injectEndpoints({
    endpoints: builder => ({
        getAllCommentsByPostId: builder.query<any, string | undefined>({
            query: (postId) => `comments/${postId}`,
            providesTags: ["Comment"]
        }),
        addComment: builder.mutation<boolean, AddCommentRequest>({
            query: (body) => ({
                url: "comments/",
                method: "POST",
                body
            }),
            invalidatesTags: ["Comment", "Post"]
        }),
        removeComment: builder.mutation<boolean, RemoveCommentRequest>({
            query: ({ postId, commentId }) => ({
                url: `comments/${postId}/${commentId}`,
                method: "DELETE"
            }),
            invalidatesTags: ["Comment", "Post"]
        })
    })
});

export const { 
    useGetAllCommentsByPostIdQuery,
    useAddCommentMutation,
    useRemoveCommentMutation
} = commentsApi;