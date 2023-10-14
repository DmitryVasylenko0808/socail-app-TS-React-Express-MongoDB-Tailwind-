import React, { useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { useGetAllPostsByUserIdQuery } from '../../redux/slices/postsApi';
import { useFollowUserMutation, useGetProfileQuery, useUnfollowUserMutation } from '../../redux/slices/profilesApi';
import { useAppSelector } from '../../redux/hooks';
import PostsList from '../../components/PostsList';
import PostForm from '../../components/PostForm';
import EditProfileForm from '../../components/EditProfileForm';
import Modal from '../../components/Modal';
import ProfileInfoBlock from '../../components/ProfileInfoBlock';

const ProfilePage = () => {
  const { login } = useParams();
  const user = useAppSelector(state => state.auth);
  const [isOpenEdit, setIsOpenEdit] = useState(false);

  const { data: profile, isSuccess: isProfileSuccess } = useGetProfileQuery(login);
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

  const openEditForm = () => {
    setIsOpenEdit(true);
  }

  const closeEditForm = () => {
    setIsOpenEdit(false);
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
          openEditForm={openEditForm}
        />
      }
      {isProfileSuccess && user.login === profile.login && <PostForm />}
      {posts.isLoading ? <div>Loading...</div> : <PostsList posts={posts.data} />}

      {isOpenEdit && isProfileSuccess &&
        <Modal onClose={closeEditForm}>
          <EditProfileForm userLogin={profile?.login}/>
        </Modal>}
    </div>
  );
}

export default ProfilePage;