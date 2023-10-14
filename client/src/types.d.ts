export type User = {
    _id: string,
    login: string,
    isPrivate: boolean,
    name: string,
    location: {
        country: string,
        city: string
    },
    about: string,
    avatar_file: string,
    saved_posts: Post[],
    followers: string[],
    followings: string[],
    black_list: User[],
    countFollowers?: number,
    countFollowings?: number
};

export type Post = {
    _id: string,
    user: User,
    text: string,
    image: string,
    comments_count: number
    likes_list: User[],
    saves_list: User[],
    createdAt: string,
    updatedAt: string
};

export type Comment = {
    _id: string,
    user: string | User,
    post: string | Post,
    text: string,
    createdAt: string
}