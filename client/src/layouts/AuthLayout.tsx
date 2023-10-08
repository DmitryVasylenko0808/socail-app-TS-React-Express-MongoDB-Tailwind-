import React from 'react';
import { Link, Outlet } from 'react-router-dom';

const AuthLayout = () => {
  return (
    <div className="h-screen flex flex-col justify-center items-center">
      <Link to="/" className="">
        <h1 className="font-bold text-4xl pt-4 pb-7">Social App.</h1>
      </Link>
      <p className="mb-7 text-zinc-500">Login or sign up to publish your posts and share with your followers</p>
      <div className="px-16 pt-5 pb-8 w-[600px] border rounded-2xl shadow-2xl">
        <Outlet />
      </div>
    </div>
  );
}

export default AuthLayout;