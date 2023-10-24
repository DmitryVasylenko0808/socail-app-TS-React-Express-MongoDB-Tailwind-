import React from 'react';
import NavBar from '../components/NavBar';
import SideBar from '../components/SideBar';
import { Outlet } from 'react-router';

const MainLayout = () => {
  return (
    <main className="relative w-full h-full">
      <NavBar />
      <section className="p-10 ml-[270px] w-[790px]">
        <Outlet />
      </section>
      <SideBar />
    </main>
  );
}

export default MainLayout;