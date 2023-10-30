import React from "react";
import UserItem from "../UserItem";

type UserItemType = {
    _id: string,
    name: string,
    login: string,
    avatar_file?: string
}

type UsersListProps = {
    list: UserItemType[] | undefined,
    isOwn?: boolean,
    type: "followers" | "followings" | "blacklist",
    removeItem: (id: string) => Promise<void>
}

const UsersList = ({ list, isOwn, type, removeItem }: UsersListProps) => {
    return (
        <div className="">
            {list?.map(f => 
                <UserItem 
                    {...f} 
                    isOwnFollower={isOwn && type === "followers"} 
                    isOwnFollowing={isOwn && type === "followings"}
                    isBlackList={type === "blacklist"} 
                    remove={removeItem}
                    key={f._id}
                />
            )}
        </div>
    )
};

export default UsersList;