import React from "react";
import {
    MdHome,
    MdBookmark,
    MdOutlinePersonOutline,
    MdSettings,
    MdLogout,
    MdLogin
} from "react-icons/md";
import { NavLink, Link } from "react-router-dom";

const SideBar = () => {
    return (
        <aside className="h-full fixed top-0 flex-none w-[270px] px-5 border-r">
            <h1 className="font-bold text-4xl pt-4 pb-7">Social App.</h1>
            <nav className="flex flex-col text-xl text-zinc-500/75">
                <NavLink to="/" className="navlink">
                    <MdHome size={30} />
                    Home
                </NavLink>
                <NavLink to="/saved" className="navlink">
                    <MdBookmark size={30} />
                    Saved Posts
                </NavLink>
                <NavLink to="/profile/1" className="navlink">
                    <MdOutlinePersonOutline size={30} />
                    Profile
                </NavLink>
                <hr className="my-3 border-zinc-200" />
                <NavLink to="/settings" className="navlink">
                    <MdSettings size={30} />
                    Settings
                </NavLink>
                <button className="navlink">
                    <MdLogout size={30} />
                    Sign Out
                </button>
                <Link to="/auth/signin" className="navlink">
                    <MdLogin size={30} />
                    Sign In
                </Link>
            </nav>
        </aside>
    )
};

export default SideBar;