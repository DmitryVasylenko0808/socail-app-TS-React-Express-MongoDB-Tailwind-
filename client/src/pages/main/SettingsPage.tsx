import React, { useState, useEffect } from 'react';
import { MdBedtime, MdWbSunny } from "react-icons/md";
import { HiChevronRight } from "react-icons/hi";
import { Link } from 'react-router-dom';
import Switcher from '../../components/Switcher';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { useTogglePrivateUserMutation } from '../../redux/services/profilesApi';
import { setPrivateStatus } from '../../redux/authSlice';

const SettingsPage = () => {
  const [isDark, setDark] = useState<boolean>(false);
  const isPrivate = useAppSelector(state => state.auth.isPrivate);
  const dispatch = useAppDispatch();

  const [togglePrivate, { isSuccess }] = useTogglePrivateUserMutation();

  useEffect(() => {
    localStorage.getItem("theme") === "dark" 
      ? setDarkTheme() 
      : setLightTheme();
  }, []);

  const setLightTheme = () => {
    document.documentElement.classList.add("light");
    document.documentElement.classList.remove("dark");
    localStorage.removeItem("theme");
    setDark(false);
  }

  const setDarkTheme = () => {
    document.documentElement.classList.add("dark");
    document.documentElement.classList.remove("light");
    localStorage.setItem("theme", "dark");
    setDark(true);
  }

  const toggleThemeHandle = (value: boolean) => {
    isDark ? setLightTheme() : setDarkTheme();
  }

  const togglePrivateHandle = async (value: boolean) => {
    console.log(value);
    await togglePrivate({ isPrivate: value });
    dispatch(setPrivateStatus({ isPrivate: value }));
  }

  return (
    <>
      <div className="py-3 border-b flex justify-between items-center dark:border-slate-700">
        <h2 className="text-xl font-bold dark:text-white">Theme</h2>
        <Switcher 
          checked={isDark ? true : false}
          labels={{ 
            first: <MdWbSunny size={26} />, 
            last: <MdBedtime size={26} /> 
          }}
          onChange={toggleThemeHandle}
        />
      </div>

      <div className="py-3 border-b flex justify-between items-center dark:border-slate-700">
        <h2 className="text-xl font-bold dark:text-white">Private Account</h2>
        <Switcher 
          checked={isPrivate ? true : false}
          labels={{ 
            first: "No", 
            last: "Yes" 
          }}
          onChange={togglePrivateHandle}
        />
      </div>

      <Link to={"/blacklist"} className="py-3 border-b flex justify-between items-center text-zinc-500 dark:border-slate-700">
        <h2 className="text-black text-xl font-bold dark:text-white">Black List</h2>
        <HiChevronRight size={34} />
      </Link>

      <button className="w-full py-3 border-b flex justify-between items-center text-zinc-500 dark:border-slate-700">
        <h2 className="text-black text-xl font-bold dark:text-white">Delete Account</h2>
        <HiChevronRight size={34} />
      </button>
    </>
  );
}

export default SettingsPage;