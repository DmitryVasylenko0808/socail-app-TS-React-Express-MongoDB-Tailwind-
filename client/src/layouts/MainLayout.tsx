import React from 'react';
import NavBar from '../components/NavBar';
import SideBar from '../components/SideBar';
import Header from '../components/Header';
import { Outlet } from 'react-router';

const MainLayout = () => {
  return (
    <main className="relative w-full h-full ">
      <NavBar />
      <section className="ml-[270px] w-[770px]">
        <Header />
        <div className="p-10">
          <Outlet />
        </div>
      </section>
      <SideBar />
    </main>
  );
}

export default MainLayout;