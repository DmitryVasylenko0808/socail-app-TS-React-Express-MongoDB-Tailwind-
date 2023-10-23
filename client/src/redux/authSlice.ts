import { createSlice } from "@reduxjs/toolkit";

type AuthState = {
    id: string,
    login: string,
    isPrivate: boolean,
    token: string
};

const initialState: AuthState = {
    id: "",
    login: "",
    isPrivate: false,
    token: ""
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setUserInfo: (state, { payload }) => {
            localStorage.setItem("token", payload.token);
            state.id = payload.id;
            state.login = payload.login;
            state.isPrivate = payload.isPrivate;
            state.token = payload.token;
        },
        setPrivateStatus: (state, { payload }) => {
            state.isPrivate = payload.isPrivate;
        },
        logout: (state) => {
            localStorage.removeItem("token");
            state.id = "";
            state.login = "";
            state.isPrivate = false;
            state.token = "";
        }
    }
});

export const { setUserInfo, setPrivateStatus, logout } = authSlice.actions;
export default authSlice.reducer;