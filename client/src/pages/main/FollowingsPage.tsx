import React from 'react';
import { useGetFollowingsQuery, useUnfollowUserMutation } from '../../redux/slices/profilesApi';
import { useParams } from 'react-router';
import { useAppSelector } from '../../redux/hooks';
import UsersList from '../../components/UsersList';

const FollowingsPage = () => {
  const { login } = useParams();
  const user = useAppSelector(state => state.auth);

  const { data: followings, isLoading, isFetching, isSuccess, isError } = useGetFollowingsQuery(login);
  const [unFollowUser, { isSuccess: isUnfollowSuccess }] = useUnfollowUserMutation();

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (isSuccess && followings.length === 0) {
    return <div>This user doesn't follow anybody</div>
  }

  const removeUserHandle = async (id: string) => {
    await unFollowUser(id).unwrap()
      .catch(err => { 
          alert(err.data.message) 
      });
  }

  return (
    <UsersList
      list={followings}
      isOwn={login === user.login}
      type="followings"
      removeItem={removeUserHandle}
    />
  );
}

export default FollowingsPage;