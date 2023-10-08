import { User } from "../../types";
import { emptySplitApi } from "./emptySplitApi";

export const profilesApi = emptySplitApi.injectEndpoints({
    endpoints: builder => ({
        getProfile: builder.query<User, string | undefined>({
            query: (login) => `profiles/${login}`
        }),
    })
});

export const { useGetProfileQuery } = profilesApi;