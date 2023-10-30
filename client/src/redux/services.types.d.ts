import { Comment } from "../types";

/* AUTH */

export type AuthorizedUserResponse = {
    id: string,
    login: string,
    isPrivate: boolean
};

export type AuthResponse = {
    id: string,
    login: string,
    token: string
};

export type LoginRequest = {
    login: string,
    password: string
};

export type RegisterRequest = {
    login: string,
    password: string,
    password_confirm: string,
    name: string,
    country: string,
    city: string,
    avatar_file: string
};

export type PasswordConfirmRequest = {
    password: string
};

/* PROFILES */

export type Follower = {
    _id: string,
    login: string,
    name: string,
    avatar_file: string
};

export type Following = {
    _id: string,
    login: string,
    name: string,
    avatar_file: string
};

export type FetchFollowersResponse = Follower[];
export type FetchFollowingsResponse = Following[];

export type ProfilesEditRequest = {
    userId?: string,
    name: string,
    about: string,
    country: string,
    city: string,
    avatar_file: string
};

export type ResultUserItem = {
    _id: string,
    login: string,
    name: string,
    avatar_file: string
}
export type GetRecommendsResponse = ResultUserItem[];
export type SearchResponse = ResultUserItem[];

/* POSTS */

export type GetAllPostsRequest = {
    limit: number
};

export type GetOnePostRequest = {
    userId?: string, 
    postId?: string
};

export type CreatePostRequest = {
    text: string,
    image: string
};

export type RequestEditPost = {
    postId: string,
    text: string,
    image_file: string
};

/* COMMENTS */

export type GetCommentsResponse = Comment[];

export type AddCommentRequest = {
    postId?: string,
    text: string
};

export type RemoveCommentRequest = {
    postId?: string,
    commentId?: string
};