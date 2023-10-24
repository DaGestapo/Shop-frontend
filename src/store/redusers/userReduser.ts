import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import { UserI, InitStateI } from '../../model/userI';


const initialState: InitStateI = {
    auth: false,
    admin: false,
    user: null,
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<UserI | null>) => {
            if(action.payload === null) {
                state.admin = false;
                state.auth = false;
                state.user = null;
            } else {
                if(action.payload.role === 'ADMIN') {
                    state.admin = true;
                } else {
                    state.admin = false;
                }
                state.auth = true;
                state.user = action.payload;
            }
        },

        setUserBalance: (state, action: PayloadAction<string | null>) => {
            if(state.user === null) return;

            if(action.payload === null) {
                state.user.balance = '0';
            } else {
                state.user.balance = action.payload;
            }
        }
    }
});

export const {setUser, setUserBalance} = userSlice.actions;
export const userReduser = userSlice.reducer;