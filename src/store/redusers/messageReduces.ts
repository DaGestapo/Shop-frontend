import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export interface CustomeMessageI {
    message: string;
    isError: boolean;
}

const initialState:CustomeMessageI = {
    message: '',
    isError: false,
}

export const serverMessageSlice = createSlice({
    name: 'error',
    initialState,
    reducers: {
        setMessageError: (state, action: PayloadAction<string>) => {
            state.message = action.payload;
            state.isError = true;
        },

        setMessage: (state, action: PayloadAction<string>) => {
            state.message = action.payload;
            state.isError = false;
        },

        removeMessage: (state) => {
            state.message = '';
            state.isError = false;
        }
    }
      
});

export const {setMessageError, setMessage, removeMessage} = serverMessageSlice.actions;
export const messageReduser = serverMessageSlice.reducer;