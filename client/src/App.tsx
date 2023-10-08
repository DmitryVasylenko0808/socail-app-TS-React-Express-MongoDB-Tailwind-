import React from 'react';
import { Route, Routes } from "react-router-dom";
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

const App = () => {
  return (
    <div className="h-full">
      <div className="container mx-auto h-full">
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<FeedPage />} />
            <Route path="/saved" element={<SavedPostsPage />} />
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="/post/:id" element={<PostPage />} />
            <Route path="/blackist" element={<BlackListPage />} />
            <Route path="/profile/:login" element={<ProfilePage />} />
            <Route path='/:login/followers' element={<FollowersPage />} />
            <Route path='/:login/followings' element={<FollowingsPage />} />
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