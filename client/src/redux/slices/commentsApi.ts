import { emptySplitApi } from "./emptySplitApi";

type GetCommentsResponse = Comment[];

export const commentsApi = emptySplitApi.injectEndpoints({
    endpoints: builder => ({
        getAllCommentsByPostId: builder.query<any, string | undefined>({
            query: (postId) => `comments/${postId}`
        })
    })
});

export const { useGetAllCommentsByPostIdQuery } = commentsApi;