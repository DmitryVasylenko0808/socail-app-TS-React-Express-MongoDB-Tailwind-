import { type } from "os";
import { User } from "../../types";
import { emptySplitApi } from "./emptySplitApi";

type AuthResponse = {
    id: string,
    login: string, 
    token: string
};

type LoginRequest = {
    login: string, 
    password: string
}

type RegisterRequest = {
    login: string, 
    password: string,
    password_confirm: string,
    name: string,
    country: string,
    city: string,
    avatar_file: string
}

export const authApi = emptySplitApi.injectEndpoints({
    endpoints: builder => ({
        getAuthorizedUser: builder.query<{ id: string, login: string, isPrivate: boolean }, null | undefined>({
            query: () => "/auth/me"
        }),
        signInUser: builder.mutation<AuthResponse, LoginRequest>({
            query: (body) => ({ 
                url: "/auth/signin",
                method: "POST",
                body
            })
        }),
        signUpUser: builder.mutation<boolean, FormData>({
            query: (body) => ({
                url: "/auth/signup",
                method: "POST",
                body,
                formData: true
            })
        })
    })
});

export const { 
    useGetAuthorizedUserQuery, 
    useSignInUserMutation, 
    useSignUpUserMutation 
} = authApi;