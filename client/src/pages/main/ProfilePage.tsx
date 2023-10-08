import React from 'react';
import { useParams } from 'react-router-dom';
import PostsList from '../../components/PostsList';
import { useGetAllPostsByUserIdQuery } from '../../redux/slices/postsApi';
import { useGetProfileQuery } from '../../redux/slices/profilesApi';
import ProfileInfoBlock from '../../components/ProfileInfoBlock';
import { useAppSelector } from '../../redux/hooks';
import PostForm from '../../components/PostForm';

const ProfilePage = () => {
  const { login } = useParams();
  const user = useAppSelector(state => state.auth);

  const profile = useGetProfileQuery(login);
  const posts = useGetAllPostsByUserIdQuery(profile.data?._id, { skip: !profile.isSuccess });

  return (
    <div>
      {profile.isSuccess && posts.isSuccess &&
        <ProfileInfoBlock
          {...profile.data}
          postsCount={posts.data?.length}
          isAuthorizedProfile={user.login === profile.data.login}
        />
      }
      {profile.isSuccess && user.login === profile.data?.login && <PostForm />}
      {posts.isLoading ? <div>Loading...</div> : <PostsList posts={posts.data} />}
    </div>
  );
}

export default ProfilePage;