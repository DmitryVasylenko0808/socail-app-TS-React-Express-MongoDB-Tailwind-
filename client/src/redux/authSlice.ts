import { createSlice } from "@reduxjs/toolkit";

type AuthState = {
    id: string,
    login: string,
    token: string
};

const initialState: AuthState = {
    id: "",
    login: "",
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
            state.token = payload.token
        },
        logout: (state) => {
            localStorage.removeItem("token");
            state.id = "";
            state.login = "";
            state.token = "";
        }
    }
});

export const { setUserInfo, logout } = authSlice.actions;
export default authSlice.reducer;