import React from "react";
import { Navigate, Outlet } from "react-router";
import { useAuth } from "..";


const RequireAuth = () => {
    const isAuthorized = useAuth();

    if (!isAuthorized) {
        return <Navigate to="/auth/signin" />
    }

    return <Outlet />;
}

export default RequireAuth;