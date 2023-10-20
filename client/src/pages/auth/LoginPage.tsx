import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import TextField from "../../components/TextField";
import { useSignInUserMutation } from '../../redux/services/authApi';
import { useAppDispatch } from '../../redux/hooks';
import { setUserInfo } from '../../redux/authSlice';
import Loader from '../../components/Loader';

type LoginFormFields = {
  login: { value: string },
  password: { value: string }
}

const LoginPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [signIn, { data: result, isLoading, isSuccess, isError, error }] = useSignInUserMutation();
  const [errorMessage, setErrorMessage] = useState<string>("");

  const onSignInHandle = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    const target = e.target as typeof e.target & LoginFormFields;
    const data = {
      login: target.login.value,
      password: target.password.value
    };

    await signIn(data).unwrap()
      .then(data => {
        dispatch(setUserInfo(data));
        navigate("/");
      })
      .catch(err => { setErrorMessage(err.data.message) });
  }

  return (
    <form onSubmit={onSignInHandle}>
      <h2 className="mb-7 font-bold text-center text-2xl dark:text-white">Sign In</h2>
      <TextField id="login" isInvalid={isError}>Login*</TextField>
      <TextField id="password" type="password" isInvalid={isError}>Password*</TextField>
      {isError && <p className="mb-7 text-center text-red-500">{errorMessage}</p>}
      <p className="mb-7 text-zinc-500">
        Don't have an account? <Link to="/auth/signup" className="text-stripe-400 hover:text-stripe-500 underline">Sign Up</Link>
      </p>
      <button 
        type="submit" 
        className="w-full py-3 bg-stripe-400 rounded-full flex justify-center text-white font-bold 
        hover:bg-stripe-500 disabled:opacity-50 disabled:cursor-auto hover:disabled:bg-stripe-400"
        disabled={isLoading}
      >
        {isLoading ? <Loader size="normal" variant="white" /> : `Sign In`}
      </button>
    </form>
  );
}

export default LoginPage;