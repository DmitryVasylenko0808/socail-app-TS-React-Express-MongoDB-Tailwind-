import React from "react";
import { Link } from 'react-router-dom';
import { User } from "../types";
import { MdLocationPin, MdEdit } from "react-icons/md";

type ProfileInfoBlockProps = User & {
    postsCount: number,
    isOwnProfile: boolean,
    isFollower: boolean,
    isFollowing: boolean,
    onFollow?: () => void,
    onUnfollow?: () => void
}

const ProfileInfoBlock = ({ avatar_file, name, login, about, location, followers, followings, postsCount, isOwnProfile, isFollower, isFollowing, onFollow, onUnfollow }: ProfileInfoBlockProps) => {
    const path = "http://localhost:5000/static/avatars";

    let imageSrc;
    if (!avatar_file) {
        imageSrc = `${window.location.origin}/nullavatar.jpg`;
    } else {
        imageSrc = `${path}/${avatar_file}`;
    }

    const editProfileButton =
        <Link
            to={"/"}
            className="w-[200px] h-[48px] inline-flex justify-center items-center gap-x-3 border border-stripe-500 rounded-full 
            font-bold text-stripe-500 hover:bg-stripe-100"
        >
            <MdEdit size={24} />
            Edit Profile
        </Link>

    const followButton =
        <button
            onClick={onFollow}
            className="w-[200px] h-[48px] bg-stripe-400 rounded-full font-bold text-white hover:bg-stripe-500"
        >
            Follow
        </button>

    const unfollowButton =
        <button
            onClick={onUnfollow}
            className="w-[200px] h-[48px] bg-stripe-400 rounded-full font-bold text-black hover:bg-stripe-500"
        >
            Unfollow
        </button>
    
    const setButton = () => {
        if (isOwnProfile) {
            return editProfileButton;
        } else if (isFollowing) {
            return unfollowButton;
        } else {
            return followButton;
        }
    }

    return (
        <>
            <div className="mb-4 flex justify-between items-center">
                <img
                    src={imageSrc}
                    alt="avatar"
                    className="w-[160px] h-[160px] rounded-full"
                />
                <div className="flex gap-x-3">
                    {setButton()}
                </div>
            </div>

            <div className="mb-6 py-4 border-b-2">
                <h2 className="text-2xl font-bold">{name}</h2>
                <div className="mb-2 text-zinc-500">{`@${login}`}</div>
                <p className="mb-6">
                    {about}
                </p>
                <div className="mb-3 flex gap-x-8 text-zinc-500">
                    <span className="inline-flex items-center gap-x-3">
                        <MdLocationPin size={24} />
                        {location.country}, {location.city}
                    </span>
                </div>
                <div className="flex gap-x-8">
                    <div className="">
                        <span className="font-bold">{postsCount}</span> Posts
                    </div>
                    <Link to={`/followers/${login}`} className="">
                        <span className="font-bold">{followers.length}</span> Followers
                    </Link>
                    <Link to={`/followings/${login}`} className="">
                        <span className="font-bold">{followings.length}</span> Followings
                    </Link>
                </div>
            </div>
        </>
    )
}

export default ProfileInfoBlock;