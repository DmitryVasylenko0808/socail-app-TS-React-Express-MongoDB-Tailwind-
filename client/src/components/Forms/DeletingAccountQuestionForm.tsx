import React from "react";
import { useDeleteAccountUserMutation } from "../../redux/services/profilesApi";
import { useNavigate } from "react-router";
import { useAppDispatch } from "../../redux/hooks";
import { logout } from "../../redux/authSlice";

type DeletingAccountQuestionFormProps = {
    onCancel?: () => void;
}

const DeletingAccountQuestionForm = ({ onCancel }: DeletingAccountQuestionFormProps) => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const [deleteAccount] = useDeleteAccountUserMutation();

    const cancelHandle = (e: React.SyntheticEvent) => {
        e.preventDefault();
        onCancel && onCancel();
    }

    const deleteAccountHandle = async (e: React.SyntheticEvent) => {
        e.preventDefault();
        await deleteAccount(null)
            .unwrap()
            .then(() => {
                dispatch(logout());
                alert("Your account has been successfully deleted");
                navigate("/auth/signin", { replace: true });
            });
    }

    return (
        <div>
            <h2 className="mb-4 font-bold text-center text-2xl dark:text-white">
                Do you really want to delete your account?
            </h2>
            <p className="mb-9 text-center text-zinc-500">
                If you will delete your account, your profile, posts and comments will be deleted
            </p>

            <form onSubmit={deleteAccountHandle}>
                <div className="flex justify-between items-center">
                    <button
                        onClick={cancelHandle}
                        className="h-[48px] px-4 text-stripe-500 font-bold"
                    >
                        No, cancel
                    </button>
                    <button
                        type="submit"
                        className="w-[200px] h-[48px] bg-stripe-400 rounded-full font-bold text-white hover:bg-stripe-500"
                    >
                        Yes, delete
                    </button>
                </div>
            </form>
        </div>
    )
};

export default DeletingAccountQuestionForm;