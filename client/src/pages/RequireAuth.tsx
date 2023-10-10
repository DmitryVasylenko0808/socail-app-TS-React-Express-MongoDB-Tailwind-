import React from "react";
import { Navigate, Outlet } from "react-router";


const RequireAuth = () => {
    if (!localStorage.getItem("token")) {
        return <Navigate to="/auth/signin" />
    }

    return <Outlet />;
}

export default RequireAuth;