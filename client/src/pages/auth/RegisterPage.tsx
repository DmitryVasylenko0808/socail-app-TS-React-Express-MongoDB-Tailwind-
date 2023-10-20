import React, { useState, useEffect } from 'react';
import { useSignUpUserMutation } from '../../redux/services/authApi';
import { Link } from 'react-router-dom';
import TextField from '../../components/TextField';
import SelectAvatarBlock from '../../components/SelectAvatarBlock';
import Loader from '../../components/Loader';

type ErrorRegister = {
  path: string,
  message: string
}

type RegisterFormFields = {
  login: { value: string },
  password: { value: string },
  password_confirm: { value: string },
  name: { value: string },
  country: { value: string },
  city: { value: string },
  avatar_file: { files: string }
}

const RegisterPage = () => {
  const [error, setError] = useState<ErrorRegister | null>(null);
  const [signUp, { isLoading, isSuccess }] = useSignUpUserMutation(); 

  useEffect(() => {
    if (isSuccess) {
      setError(null);
    }
  }, [isSuccess])
  
  const isExistErrorField = (path: string): string | undefined => {
    return error?.path === path ? error.message : undefined;
  };

  const registerUserHandle = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    const target = e.target as typeof e.target & RegisterFormFields;
    const data = {
      login: target.login.value,
      password: target.password.value,
      password_confirm: target.password_confirm.value,
      name: target.name.value,
      country: target.country.value,
      city: target.city.value,
      avatar_file: target.avatar_file.files[0]
    }

    const formData = new FormData();
    formData.append("login", data.login);
    formData.append("password", data.password);
    formData.append("password_confirm", data.password_confirm);
    formData.append("name", data.name);
    formData.append("country", data.country);
    formData.append("city", data.city);
    formData.append("avatar_file", data.avatar_file);

    await signUp(formData).unwrap()
      .catch(err => { setError({ ...err.data }) });
  }

  return (
    <form onSubmit={registerUserHandle}>
      <h2 className="mb-7 font-bold text-center text-2xl dark:text-white">Registration</h2>
      <TextField id="login" error={isExistErrorField("login")}>Login*</TextField>
      <TextField 
        id="password" 
        type="password" 
        error={isExistErrorField("password")}
      >
        Password*
      </TextField>
      <TextField 
        id="password_confirm" 
        type="password" 
        error={isExistErrorField("password_confirm")}
      >
        Confirm Password*
      </TextField>
      <TextField id="name" error={isExistErrorField("name")}>Name*</TextField>
      <div className="flex gap-x-3">
        <TextField id="country" error={isExistErrorField("country")}>Country</TextField>
        <TextField id="city" error={isExistErrorField("city")}>City</TextField>
      </div>

      <SelectAvatarBlock imgSrc="" error={isExistErrorField("avatar_file")} id="avatar_file" />

      {isSuccess && <p className="mb-7 text-center font-bold text-zinc-500">Registration is succesfully complete</p>}
      <p className="mb-7 text-zinc-500">
        Do you have an account? <Link to="/auth/signin" className="text-stripe-400 hover:text-stripe-500 underline">Sign In</Link>
      </p>
      <button 
        type="submit" 
        className="w-full py-3 bg-stripe-400 rounded-full flex justify-center text-white font-bold hover:bg-stripe-500 
        disabled:opacity-50 disabled:cursor-auto hover:disabled:bg-stripe-400"
        disabled={isLoading}
      >
        {isLoading ? <Loader size="normal" variant="white" /> : `Sign Up`}
      </button>
    </form>
  );
}

export default RegisterPage;