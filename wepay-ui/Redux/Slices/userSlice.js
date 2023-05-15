import { createSlice } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';

export const userSlice=createSlice({
    name:'userSlice',
    initialState:{
        user:{}
    },
    reducers:{

        saveUser:(state,action)=>{
            state.user = action.payload
        },

    },
    extraReducers: builder => {

        builder.addCase(HYDRATE, (state, action) => {
            if(!action.payload.userSlice.user){
                return state
            }
            state.user = action.payload.userSlice.user;
        });

    }
})

export const { saveUser } = userSlice.actions;
export const selectUser = state => state.userSlice.user;
export default userSlice.reducer;