import React from 'react';
import { Navigate, Route, Routes } from "react-router-dom";
import MainLayout from './layouts/MainLayout';
import FeedPage from './pages/main/FeedPage';
import SavedPostsPage from './pages/main/SavedPostsPage';
import ProfilePage from './pages/main/ProfilePage';
import SettingsPage from './pages/main/SettingsPage';
import PostPage from './pages/main/PostPage';
import BlackListPage from './pages/main/BlackListPage';
import FollowersPage from './pages/main/FollowersPage';
import FollowingsPage from './pages/main/FollowingsPage';
import AuthLayout from './layouts/AuthLayout';
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';
import RequireAuth from './pages/RequireAuth';
import { useAppDispatch, useAppSelector } from './redux/hooks';
import { useGetAuthorizedUserQuery } from "./redux/slices/authApi";
import { setUserInfo } from './redux/authSlice';
import { useAuth } from '.';

const App = () => {
  const isAuthorized = useAuth();
  const user = useAppSelector(state => state.auth);
  const dispatch = useAppDispatch();

  const { data: authData } = useGetAuthorizedUserQuery(null, { skip: !!user.login === true });

  if (isAuthorized && !user.login) {
    dispatch(setUserInfo({ 
      ...authData, 
      token: localStorage.getItem("token")
    }))
  }

  return (
    <div className="h-full">
      <div className="container mx-auto h-full">
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<FeedPage />} />
            <Route path="/post/:id" element={<PostPage />} />
            <Route path="/profile/:login" element={<ProfilePage />} />
            <Route element={<RequireAuth />}>
              <Route path="/followers/:login" element={<FollowersPage />} />
              <Route path="/followings/:login" element={<FollowingsPage />} />
              <Route path="/saved" element={<SavedPostsPage />} />
              <Route path="/settings" element={<SettingsPage />} />
              <Route path="/blacklist" element={<BlackListPage />} />
            </Route>
          </Route>
          <Route path="auth" element={<AuthLayout />}>
            <Route path="signin" element={<LoginPage />} />
            <Route path="signup" element={<RegisterPage />} />
          </Route>
        </Routes>
      </div>
    </div>
  );
}

export default App;