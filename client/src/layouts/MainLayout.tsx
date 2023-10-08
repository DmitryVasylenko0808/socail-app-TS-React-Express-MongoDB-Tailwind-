import React from 'react';
import SideBar from '../components/SideBar';
import { Outlet } from 'react-router';

const MainLayout = () => {
  return (
    <main className="relative w-full h-full">
      <SideBar />
      <section className="p-10 ml-[270px]">
        <Outlet />
      </section>
    </main>
  );
}

export default MainLayout;