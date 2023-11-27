import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export interface CustomeErrorI {
    message: string;
    isError: boolean;
}

const initialState:CustomeErrorI = {
    message: '',
    isError: false,
}

export const errorSlice = createSlice({
    name: 'error',
    initialState,
    reducers: {
        setError: (state, action: PayloadAction<string>) => {
            state.message = action.payload;
            state.isError = true;
        },

        removeError: (state) => {
            state.message = '';
            state.isError = false;
        }
    }
      
});

export const {setError, removeError} = errorSlice.actions;
export const errorReduser = errorSlice.reducer;