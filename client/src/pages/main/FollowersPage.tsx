import React from 'react';
import { useGetFollowersQuery, useRemoveFollowerUserMutation } from '../../redux/services/profilesApi';
import { Navigate, useParams } from 'react-router';
import { useAppSelector } from '../../redux/hooks';
import UsersList from '../../components/Lists/UsersList';

const FollowersPage = () => {
  const { login } = useParams();
  const user = useAppSelector(state => state.auth);

  const { data: followers, isLoading, isFetching, isSuccess, isError, error } = useGetFollowersQuery(login);
  const [removeFollowerUser, { isSuccess: isRemoveFollowerUserSuccess }] = useRemoveFollowerUserMutation();

  const removeUserHandle = async (id: string) => {
    await removeFollowerUser(id).unwrap()
      .catch(err => { 
          alert(err.data.message) 
      });
  } 
  
  if (isLoading) {
    return <div>Loading...</div>
  }

  if (isSuccess && followers.length === 0) {
    return <div>Nobody follows this user</div>
  }

  if (error && "status" in error && error.status === 404) {
    return <Navigate to="*" />;
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