import { emptySplitApi } from "./emptySplitApi";
import { User } from "../../types";
import { 
    FetchFollowersResponse, 
    FetchFollowingsResponse, 
    GetRecommendsResponse, 
    ProfilesEditRequest, 
    SearchResponse
} from "../services.types";

export const profilesApi = emptySplitApi.injectEndpoints({
    endpoints: builder => ({
        getProfile: builder.query<User, string | undefined>({
            query: (login) => `profiles/${login}`,
            providesTags: (result, error, arg) => {
                return result 
                    ? [{ type: "User" as const, id: result._id }, "Post"] 
                    : [];
            }
        }),
        getFollowers: builder.query<FetchFollowersResponse, string | undefined>({
            query: (login) => `profiles/${login}/followers`,
            providesTags: ["User"]
        }),
        getFollowings: builder.query<FetchFollowingsResponse, string | undefined>({
            query: (login) => `profiles/${login}/followings`,
            providesTags: ["User"]
        }),
        getRecommends: builder.query<GetRecommendsResponse, null>({
            query: () => "profiles/recommends/need_to_follow",
            providesTags: ["User", "Post"]
        }),
        searchUsers: builder.query<SearchResponse, string>({
            query: (name) => `profiles/search/${name}`
        }),
        followUser: builder.mutation<boolean, { userId: string }>({
            query: (body) => ({
                url: "profiles/follow",
                method: "POST",
                body
            }),
            invalidatesTags: ["User"]
        }),
        unfollowUser: builder.mutation<boolean, string>({
            query: (userId) => ({
                url: `profiles/unfollow/${userId}`,
                method: "DELETE"
            }),
            invalidatesTags: ["User"]
        }),
        removeFollowerUser: builder.mutation<boolean, string>({
            query: (userId) => ({
                url: `profiles/remove_follower/${userId}`,
                method: "DELETE"
            }),
            invalidatesTags: ["User"]
        }),
        editProfile: builder.mutation<boolean, ProfilesEditRequest>({
            query: ({ userId, ...patch }) => {
                const formData = new FormData();
                formData.append("name", patch.name);
                formData.append("about", patch.about);
                formData.append("country", patch.country);
                formData.append("city", patch.city);
                formData.append("avatar_file", patch.avatar_file);

                return {
                    url: "profiles/edit",
                    method: "PATCH",
                    body: formData,
                    formData: true
                }
            },
            invalidatesTags: (result, error, arg) => [{ type: "User", id: arg.userId }, "Post"] 
        }),
        togglePrivateUser: builder.mutation<boolean, { isPrivate: boolean }>({
            query: (body) => ({
                url: "profiles/toggle_private",
                method: "PATCH",
                body
            }),
            invalidatesTags: ["User"]
        }),
        deleteAccountUser: builder.mutation<boolean, null | undefined>({
            query: () => ({
                url: "profiles/delete",
                method: "DELETE"
            })
        })
    })
});

export const { 
    useGetProfileQuery, 
    useGetFollowersQuery,
    useGetFollowingsQuery,
    useGetRecommendsQuery,
    useSearchUsersQuery,
    useFollowUserMutation,
    useUnfollowUserMutation,
    useRemoveFollowerUserMutation,
    useEditProfileMutation,
    useTogglePrivateUserMutation,
    useDeleteAccountUserMutation
} = profilesApi;