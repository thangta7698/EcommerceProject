import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import userApi from '../../api/userApi';

export const register = createAsyncThunk(
    'user/register',
    async (payload) => {
        const data = await userApi.register(payload)
        localStorage.setItem('access_token', data.jwt);
        return data.user;
    }
);
export const login = createAsyncThunk(
    'user/login',
    async (payload) => {
        const data = await userApi.login(payload)
        localStorage.setItem('access_token', data.jwt);
        localStorage.setItem('user', JSON.stringify(data.user))
        return data.user;
    }
)
const userSlice = createSlice({
    name: 'auth',
    initialState: {
        current: {},
        setting: {},
        user: JSON.parse(localStorage.getItem('user')) || {},

    },
    reducers: {
        logout(state, action) {
            localStorage.removeItem('user');
            localStorage.removeItem('access_token');
            localStorage.removeItem('Cart_List');
            state.user = {};

        }

    },
    extraReducers: {
        [register.fulfilled]: (state, action) => {
            // state.current = action.payload;
        },
        [login.fulfilled]: (state, action) => {
            state.user = action.payload;

        },

    }
})
const { actions, reducer } = userSlice;
export const { logout } = actions
export default reducer;