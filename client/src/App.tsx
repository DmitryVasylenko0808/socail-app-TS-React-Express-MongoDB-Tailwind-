import React, { useEffect } from 'react';
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
import { useGetAuthorizedUserQuery } from "./redux/services/authApi";
import { setUserInfo } from './redux/authSlice';
import { useAuth } from '.';
import NotFoundPage from './pages/main/NotFoundPage';

const App = () => {
  const isAuthorized = useAuth();
  const user = useAppSelector(state => state.auth);
  const dispatch = useAppDispatch();

  const { data: authData } = useGetAuthorizedUserQuery(null, { skip: !!user.login === true });

  useEffect(() => {
    if (isAuthorized && !user.login) {
      dispatch(setUserInfo({ 
        ...authData, 
        token: localStorage.getItem("token")
      }))
    }

    if (localStorage.getItem("theme") === "dark") {
      document.documentElement.classList.add("dark");
      document.documentElement.classList.remove("light");
    }
  }, [user.login, authData]);

  return (
    <div className="min-h-screen h-max dark:bg-slate-950">
      <div className="container mx-auto h-full min-h-screen">
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<FeedPage />} />
            <Route path="/post/:userId/:postId" element={<PostPage />} />
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
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;