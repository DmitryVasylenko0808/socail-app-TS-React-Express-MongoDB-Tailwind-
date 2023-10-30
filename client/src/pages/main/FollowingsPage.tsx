import React from 'react';
import { useGetFollowingsQuery, useUnfollowUserMutation } from '../../redux/services/profilesApi';
import { Navigate, useParams } from 'react-router';
import { useAppSelector } from '../../redux/hooks';
import UsersList from '../../components/Lists/UsersList';
import Loader from '../../components/Loader';

const FollowingsPage = () => {
  const { login } = useParams();
  const user = useAppSelector(state => state.auth);

  const { data: followings, isLoading, isFetching, isSuccess, isError, error } = useGetFollowingsQuery(login);
  const [unFollowUser, { isSuccess: isUnfollowSuccess }] = useUnfollowUserMutation();

  const removeUserHandle = async (id: string) => {
    await unFollowUser(id).unwrap()
    .catch(err => { 
      alert(err.data.message) 
    });
  }

  if (isLoading) {
    return (
      <div className="py-12 flex justify-center">
        <Loader size="big" variant="stripe" />
      </div>
    )
  }

  if (isSuccess && followings.length === 0) {
    return <div>This user doesn't follow anybody</div>
  }

  if (error && "status" in error && error.status === 404) {
    return <Navigate to="*" />;
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