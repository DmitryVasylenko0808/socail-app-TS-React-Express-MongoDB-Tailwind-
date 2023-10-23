import React, { useState } from 'react';
import { Navigate, useLocation, useNavigate, useParams } from 'react-router-dom';
import { useGetAllPostsByUserIdQuery } from '../../redux/services/postsApi';
import { useFollowUserMutation, useGetProfileQuery, useUnfollowUserMutation } from '../../redux/services/profilesApi';
import { useAddToBlackListMutation } from '../../redux/services/blackListApi';
import { useAppSelector } from '../../redux/hooks';
import PostsList from '../../components/Lists/PostsList';
import PostForm from '../../components/Forms/PostForm';
import EditProfileForm from '../../components/Forms/EditProfileForm';
import Modal from '../../components/Modal';
import ProfileInfoBlock from '../../components/ProfileInfoBlock';

const ProfilePage = () => {
  const { login } = useParams();
  const navigate = useNavigate();
  const user = useAppSelector(state => state.auth);
  const [isOpenEdit, setIsOpenEdit] = useState(false);

  const { data: profile, isSuccess: isProfileSuccess, error: profileError } = useGetProfileQuery(login);
  const { data: posts, isSuccess, isLoading, error} = useGetAllPostsByUserIdQuery(profile?._id, { skip: !isProfileSuccess });
  const [followUser, { isSuccess: isFollowSuccess, isError: isFollowError }] = useFollowUserMutation();
  const [unfollowUser, { isSuccess: isUnfollowSuccess, isError: isUnfollowError }] = useUnfollowUserMutation();
  const [addToBlackList, { isSuccess: isAddToBlackListSuccess }] = useAddToBlackListMutation();

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

  const addToBlackListHandle = async () => {
    if (isProfileSuccess) {
      await addToBlackList({ userId: profile._id })
        .unwrap()
        .then(() => {
          alert("The user has been added to black list");
          navigate(-1);
        })
    }
  }

  const openEditForm = () => {
    setIsOpenEdit(true);
  }

  const closeEditForm = () => {
    setIsOpenEdit(false);
  }

  const isPrivate = error && "status" in error && error.status === 403;

  const content = isPrivate 
    ? <div className="text-center text-zinc-500 text-2xl">
        This user is private. Follow him/her to see the posts
      </div> 
    : <PostsList posts={posts} />

  if (profileError && "status" in profileError && profileError.status === 404) {
    return <Navigate to="*" />;
  }

  return (
    <div>
      {isProfileSuccess &&
        <ProfileInfoBlock
          {...profile}
          postsCount={posts?.length ? posts.length : 0}
          isOwnProfile={user.login === profile.login}
          isFollower={!!user.token && profile.followings.includes(user.id)}
          isFollowing={!!user.token && profile.followers.includes(user.id)}
          onFollow={followHandle}
          onUnfollow={unfollowHandle}
          onAddToBlackList={addToBlackListHandle}
          openEditForm={openEditForm}
        />
      }
      {isProfileSuccess && user.login === profile.login && <PostForm />}
      {isLoading 
        ? <div>Loading...</div> 
        : content
      }

      {isOpenEdit && isProfileSuccess &&
        <Modal onClose={closeEditForm}>
          <EditProfileForm userLogin={profile?.login}/>
        </Modal>}
    </div>
  );
}

export default ProfilePage;