import React from "react";
import {
    MdHome,
    MdBookmark,
    MdOutlinePersonOutline,
    MdSettings,
    MdLogout,
    MdLogin
} from "react-icons/md";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { logout } from "../redux/authSlice";

const SideBar = () => {
    const user = useAppSelector(state => state.auth);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    
    const logOutHandle = () => {
        dispatch(logout());
        navigate("/auth/signin");
    }
    
    return (
        <aside className="h-full fixed top-0 flex-none w-[270px] px-5 border-r dark:border-slate-700">
            <h1 className="py-7 font-bold text-4xl dark:text-white">Social App.</h1>
            <nav className="flex flex-col text-xl text-zinc-500/75">
                <NavLink to="/" className="navlink">
                    <MdHome size={30} />
                    Home
                </NavLink>
                <NavLink to="/saved" className="navlink">
                    <MdBookmark size={30} />
                    Saved Posts
                </NavLink>
                <NavLink to={!!user.login === true ? `/profile/${user.login}` : "/auth/signin"} className="navlink">
                    <MdOutlinePersonOutline size={30} />
                    Profile
                </NavLink>
                <hr className="my-3 border-zinc-200 dark:border-slate-700" />
                <NavLink to="/settings" className="navlink">
                    <MdSettings size={30} />
                    Settings
                </NavLink>
                {!!user.login === true
                    ? <button onClick={logOutHandle} className="navlink">
                        <MdLogout size={30} />
                        Sign Out
                      </button>
                    : <Link to="/auth/signin" className="navlink">
                        <MdLogin size={30} />
                        Sign In
                      </Link>}
            </nav>
        </aside>
    )
};

export default SideBar;