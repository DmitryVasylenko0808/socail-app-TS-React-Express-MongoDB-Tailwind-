import React, { useState } from "react";
import { usePasswordConfirmMutation } from "../../redux/services/authApi";
import TextField from "../TextField";
import Loader from "../Loader";

type ConfirmPasswordFormProps = {
    onNext?: () => void;
}

type ConfirmPasswordFormFields = {
    password: { value: string };
}

type ErrorConfirm = {
    path: string,
    message: string
}

const ConfirmPasswordForm = ({ onNext }: ConfirmPasswordFormProps) => {
    const [error, setError] = useState<ErrorConfirm | null>(null);

    const [confirmPassword, { isLoading }] = usePasswordConfirmMutation();

    const confirmPasswordHandle = async (e: React.SyntheticEvent) => {
        e.preventDefault();

        const target = e.target as typeof e.target & ConfirmPasswordFormFields;
        const data = {
            password: target.password.value
        };
        
        await confirmPassword(data)
            .unwrap()
            .then(() => onNext && onNext())
            .catch(err => { setError({ ...err.data }) });
    }

    const isExistErrorField = (path: string): string | undefined => {
        return error?.path === path ? error.message : undefined;
    };

    return (
        <div>
            <h2 className="mb-4 font-bold text-center text-2xl dark:text-white">
                Password Confirmation
            </h2>
            <p className="mb-9 text-center text-zinc-500">
                Confirm your password to delete your account
            </p>

            <form onSubmit={confirmPasswordHandle}>
                <TextField 
                    id="password" 
                    type="password"
                    error={isExistErrorField("password")}
                >
                    Password
                </TextField>
                <button
                    type="submit"
                    className="w-full py-3 bg-stripe-400 rounded-full flex justify-center text-white font-bold 
                    hover:bg-stripe-500 disabled:opacity-50 disabled:cursor-auto hover:disabled:bg-stripe-400"
                    disabled={isLoading}
                >
                    {isLoading ? <Loader size="normal" variant="white" /> : "Confirm Password"}
                </button>
            </form>
        </div>
    );
};

export default ConfirmPasswordForm;