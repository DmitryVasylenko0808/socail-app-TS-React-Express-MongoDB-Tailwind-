import React from 'react';
import { useGetFollowersQuery, useRemoveFollowerUserMutation } from '../../redux/slices/profilesApi';
import { useParams } from 'react-router';
import { useAppSelector } from '../../redux/hooks';
import UsersList from '../../components/UsersList';

const FollowersPage = () => {
  const { login } = useParams();
  const user = useAppSelector(state => state.auth);

  const { data: followers, isLoading, isFetching, isSuccess, isError, error } = useGetFollowersQuery(login);
  const [removeFollowerUser, { isSuccess: isRemoveFollowerUserSuccess }] = useRemoveFollowerUserMutation();

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (isSuccess && followers.length === 0) {
    return <div>Nobody follows this user</div>
  }

  const removeUserHandle = async (id: string) => {
    await removeFollowerUser(id).unwrap()
      .catch(err => { 
          alert(err.data.message) 
      });
  } 

  return (
    <UsersList 
      list={followers} 
      isOwn={login === user.login} 
      type="followers" 
      removeItem={removeUserHandle}
    />
  );
}

export default FollowersPage;