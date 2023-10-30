import { 
    AuthorizedUserResponse, 
    AuthResponse, 
    LoginRequest, 
    RegisterRequest, 
    PasswordConfirmRequest 
} from "../services.types";
import { emptySplitApi } from "./emptySplitApi";

export const authApi = emptySplitApi.injectEndpoints({
    endpoints: builder => ({
        getAuthorizedUser: builder.query<AuthorizedUserResponse, null | undefined>({
            query: () => "/auth/me",
            providesTags: ["User"]
        }),
        signInUser: builder.mutation<AuthResponse, LoginRequest>({
            query: (body) => ({
                url: "/auth/signin",
                method: "POST",
                body
            }),
            invalidatesTags: ["User", "Post", "Comment"]
        }),
        signUpUser: builder.mutation<boolean, RegisterRequest>({
            query: (body) => {
                const formData = new FormData();
                formData.append("login", body.login);
                formData.append("password", body.password);
                formData.append("password_confirm", body.password_confirm);
                formData.append("name", body.name);
                formData.append("country", body.country);
                formData.append("city", body.city);
                formData.append("avatar_file", body.avatar_file);

                return {
                    url: "/auth/signup",
                    method: "POST",
                    body: formData,
                    formData: true
                }
            }
        }),
        passwordConfirm: builder.mutation<boolean, PasswordConfirmRequest>({
            query: (body) => ({
                url: "/auth/password_confirm",
                method: "POST",
                body
            })
        })
    })
});

export const {
    useGetAuthorizedUserQuery,
    useSignInUserMutation,
    useSignUpUserMutation,
    usePasswordConfirmMutation
} = authApi;