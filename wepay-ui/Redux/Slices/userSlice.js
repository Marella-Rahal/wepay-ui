import { createSlice } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';

export const userSlice=createSlice({
    name:'userSlice',
    initialState:{
        user:{}
    },
    reducers:{

        saveUser:(state,action)=>{
            state.user=action.payload
        },

    },
    extraReducers: builder => {

        builder.addCase(HYDRATE, (state, action) => {
            console.log("Before Hydration in userSlice : " , action.payload )
            state.user = action.payload.userSlice;
        });

    }
})

export const { saveUser } = userSlice.actions;
export const selectUser = state => state.reducer.user;
export default userSlice.reducer;