import { createSlice } from "@reduxjs/toolkit";

type AuthState = {
    login: string,
    token: string
};

const initialState: AuthState = {
    login: "",
    token: ""
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setUserInfo: (state, { payload }) => {
            localStorage.setItem("token", payload.token);
            state.login = payload.login;
            state.token = payload.token;
        }
    }
});

export const { setUserInfo } = authSlice.actions;
export default authSlice.reducer;