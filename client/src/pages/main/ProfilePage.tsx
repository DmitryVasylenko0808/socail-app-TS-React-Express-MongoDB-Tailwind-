import React from 'react';
import { Navigate, useParams } from 'react-router-dom';
import PostsList from '../../components/PostsList';
import { useGetAllPostsByUserIdQuery } from '../../redux/slices/postsApi';
import { useFollowUserMutation, useGetProfileQuery, useUnfollowUserMutation } from '../../redux/slices/profilesApi';
import ProfileInfoBlock from '../../components/ProfileInfoBlock';
import { useAppSelector } from '../../redux/hooks';
import PostForm from '../../components/PostForm';

const ProfilePage = () => {
  const { login } = useParams();
  const user = useAppSelector(state => state.auth);

  const {data: profile, isSuccess: isProfileSuccess} = useGetProfileQuery(login);
  const posts = useGetAllPostsByUserIdQuery(profile?._id, { skip: !isProfileSuccess });
  const [followUser, { isSuccess: isFollowSuccess, isError: isFollowError }] = useFollowUserMutation();
  const [unfollowUser, { isSuccess: isUnfollowSuccess, isError: isUnfollowError }] = useUnfollowUserMutation();

  const followHandle = async () => {
    if (isProfileSuccess) {
      const data = { userId: profile._id };
      await followUser(data).unwrap()
        .catch(err => { console.log(err) });
    }
  }

  const unfollowHandle = async () => {
    if (isProfileSuccess) {
      await unfollowUser(profile._id).unwrap()
        .catch(err => console.log(err));
    }
  }

  return (
    <div>
      {isProfileSuccess && posts.isSuccess &&
        <ProfileInfoBlock
          {...profile}
          postsCount={posts.data?.length}
          isOwnProfile={user.login === profile.login}
          isFollower={!!user.token && profile.followings.includes(user.id)}
          isFollowing={!!user.token && profile.followers.includes(user.id)}
          onFollow={followHandle}
          onUnfollow={unfollowHandle}
        />
      }
      {isProfileSuccess && user.login === profile.login && <PostForm />}
      {posts.isLoading 
        ? <div>Loading...</div> 
        : <PostsList posts={posts.data} />}
    </div>
  );
}

export default ProfilePage;