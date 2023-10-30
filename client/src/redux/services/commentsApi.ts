import { emptySplitApi } from "./emptySplitApi";
import { 
    GetCommentsResponse, 
    AddCommentRequest, 
    RemoveCommentRequest 
} from "../services.types";

export const commentsApi = emptySplitApi.injectEndpoints({
    endpoints: builder => ({
        getAllCommentsByPostId: builder.query<GetCommentsResponse, string | undefined>({
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