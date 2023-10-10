import { url } from "inspector";
import { User } from "../../types";
import { emptySplitApi } from "./emptySplitApi";

type Follower = {
    _id: string,
    login: string,
    name: string,
    avatar_file: string
};

type Following = {
    _id: string,
    login: string,
    name: string,
    avatar_file: string
}

type FetchFollowersResponse = Follower[];
type FetchFollowingsResponse = Following[];

export const profilesApi = emptySplitApi.injectEndpoints({
    endpoints: builder => ({
        getProfile: builder.query<User, string | undefined>({
            query: (login) => `profiles/${login}`
        }),
        getFollowers: builder.query<FetchFollowersResponse, string | undefined>({
            query: (login) => `profiles/${login}/followers`
        }),
        getFollowings: builder.query<FetchFollowingsResponse, string | undefined>({
            query: (login) => `profiles/${login}/followings`
        }),
        followUser: builder.mutation<boolean, { userId: string }>({
            query: (body) => ({
                url: "profiles/follow",
                method: "POST",
                body
            })
        }),
        unfollowUser: builder.mutation<boolean, string>({
            query: (userId) => ({
                url: `profiles/unfollow/${userId}`,
                method: "DELETE"
            })
        }),
        removeFollowerUser: builder.mutation<boolean, string>({
            query: (userId) => ({
                url: `profiles/remove_follower/${userId}`,
                method: "DELETE"
            })
        })
    })
});

export const { 
    useGetProfileQuery, 
    useGetFollowersQuery,
    useGetFollowingsQuery,
    useFollowUserMutation,
    useUnfollowUserMutation,
    useRemoveFollowerUserMutation
} = profilesApi;