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

type ProfilesEditRequest = {
    userId: string,
    name: string,
    about: string,
    country: string,
    city: string,
    avatar_file?: string
}

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
        editProfile: builder.mutation<boolean, any>({
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
        })
    })
});

export const { 
    useGetProfileQuery, 
    useGetFollowersQuery,
    useGetFollowingsQuery,
    useFollowUserMutation,
    useUnfollowUserMutation,
    useRemoveFollowerUserMutation,
    useEditProfileMutation
} = profilesApi;