import React, { useState } from "react";
import { useEditProfileMutation, useGetProfileQuery } from "../redux/slices/profilesApi";
import SelectAvatarBlock from "./SelectAvatarBlock";
import TextField from "./TextField";

type EditProfileFormProps = {
    userLogin: string
}

type ErrorEdit = {
    path: string,
    message: string
}

type EditFormFields = {
    name: { value: string },
    about: { value: string },
    country: { value: string },
    city: { value: string },
    avatar_file: { files: string }
}

const EditProfileForm = ({ userLogin }: EditProfileFormProps) => {
    const [error, setError] = useState<ErrorEdit | null>(null);

    const { data: user, isLoading: isUserLoading } = useGetProfileQuery(userLogin);
    const [editProfile, { isLoading: isEditLoading }] = useEditProfileMutation();

    const editProfileHandle = async (e: React.SyntheticEvent) => {
        e.preventDefault();

        const target = e.target as typeof e.target & EditFormFields;
        const data = {
            name: target.name.value,
            about: target.about.value,
            country: target.country.value,
            city: target.city.value,
            avatar_file: target.avatar_file.files[0]
        };

        const formData = new FormData();
        formData.append("name", data.name);
        formData.append("about", data.about);
        formData.append("country", data.country);
        formData.append("city", data.city);
        formData.append("avatar_file", data.avatar_file);

        await editProfile(formData).unwrap()
            .catch(err => { setError({ ...err.data }) });
    }

    const isExistErrorField = (path: string): string | undefined => {
        return error?.path === path ? error?.message : undefined;
    }

    if (isUserLoading) {
        return <div>Loading...</div>
    }

    return (
        <form onSubmit={editProfileHandle}>
            <TextField 
                id="name" 
                value={user?.name}
                error={isExistErrorField("name")}
            >
                Name
            </TextField>
            <TextField id="about" variant="area" value={user?.about}>About</TextField>
            <div className="flex justify-between">
                <TextField id="country" value={user?.location.country}>Country</TextField>
                <TextField id="city" value={user?.location.city}>City</TextField>
            </div>
            <SelectAvatarBlock 
                id="avatar_file" 
                imgSrc={user?.avatar_file 
                    ? `http://localhost:5000/static/avatars/${user?.avatar_file}` 
                    : ""} 
                error={isExistErrorField("avatar_file")}
            />
            <button
                type="submit"
                className="w-full py-3 bg-stripe-400 rounded-full text-white font-bold hover:bg-stripe-500 
                disabled:opacity-50 disabled:cursor-auto hover:disabled:bg-stripe-400"
                disabled={isEditLoading}
            >
                {isEditLoading ? "Loading..." : "Edit Profile"}
            </button>
        </form>
    );
}

export default EditProfileForm;