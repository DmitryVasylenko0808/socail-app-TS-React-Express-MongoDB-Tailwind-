import { emptySplitApi } from "./emptySplitApi";


export const blackListApi = emptySplitApi.injectEndpoints({
    endpoints: builder => ({
        getBlackList: builder.query<any[], null | undefined>({
            query: (body) => "blacklist/",
            providesTags: ["User", "Post", "Comment"]
        }),
        addToBlackList: builder.mutation<boolean, { userId: string }>({
            query: (body) => ({
                url: "blacklist/",
                method: "POST",
                body
            }),
            invalidatesTags: ["User", "Post", "Comment"]
        }),
        removeFromBlackList: builder.mutation<boolean, string>({
            query: (userId) => ({
                url: `blacklist/${userId}`,
                method: "DELETE"
            }),
            invalidatesTags: ["User", "Post", "Comment"]
        })
    })
});

export const {
    useGetBlackListQuery,
    useAddToBlackListMutation,
    useRemoveFromBlackListMutation
} = blackListApi;