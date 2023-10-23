import React, { useState, useEffect } from 'react';
import { MdBedtime, MdWbSunny } from "react-icons/md";
import { HiChevronRight } from "react-icons/hi";
import { Link } from 'react-router-dom';
import Switcher from '../../components/Switcher';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { useTogglePrivateUserMutation } from '../../redux/services/profilesApi';
import { setPrivateStatus } from '../../redux/authSlice';
import Modal from '../../components/Modal';
import ConfirmPasswordForm from '../../components/Forms/ConfirmPasswordForm';
import DeletingAccountQuestionForm from '../../components/Forms/DeletingAccountQuestionForm';

const SettingsPage = () => {
  const isPrivate = useAppSelector(state => state.auth.isPrivate);
  const dispatch = useAppDispatch();

  const [isDark, setDark] = useState<boolean>(false);
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [isPasswordConfirmed, setIsPasswordConfirmed] = useState<boolean>(false);

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
    await togglePrivate({ isPrivate: value });
    dispatch(setPrivateStatus({ isPrivate: value }));
  }

  const openModalHandle = () => setIsOpenModal(true);

  const closeModalHandle = () => { 
    setIsOpenModal(false);
    setIsPasswordConfirmed(false);
  }

  const nextClickHandle = () => setIsPasswordConfirmed(true);

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

      <Link to="/blacklist" className="py-3 border-b flex justify-between items-center text-zinc-500 dark:border-slate-700">
        <h2 className="text-black text-xl font-bold dark:text-white">Black List</h2>
        <HiChevronRight size={34} />
      </Link>

      <button onClick={openModalHandle} className="w-full py-3 border-b flex justify-between items-center text-zinc-500 dark:border-slate-700">
        <h2 className="text-black text-xl font-bold dark:text-white">Delete Account</h2>
        <HiChevronRight size={34} />
      </button>

      {isOpenModal &&
        <Modal onClose={closeModalHandle}>
          {!isPasswordConfirmed 
            ? <ConfirmPasswordForm onNext={nextClickHandle} /> 
            : <DeletingAccountQuestionForm onCancel={closeModalHandle} /> 
          }
        </Modal> 
      }
    </>
  );
}

export default SettingsPage;