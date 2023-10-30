import React from 'react';
import { useGetBlackListQuery, useRemoveFromBlackListMutation } from '../../redux/services/blackListApi';
import UsersList from '../../components/Lists/UsersList';
import Loader from '../../components/Loader';

const BlackListPage = () => {
  const { data, isLoading, isSuccess } = useGetBlackListQuery(null);
  const [removeUser, { isSuccess: isRemoveSuccess }] = useRemoveFromBlackListMutation();

  const removeUserHandle = async (id: string) => {
    await removeUser(id);
  }

  if (isLoading) {
    return (
      <div className="py-12 flex justify-center">
        <Loader size="big" variant="stripe" />
      </div>
    )
  }

  if (isSuccess && data.length === 0) {
    return <div>Black List is empty</div>
  }

  return (
    <UsersList
      list={data}
      type="blacklist"
      removeItem={removeUserHandle}
    />
  );
}

export default BlackListPage;