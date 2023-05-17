import { createSlice } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';

export const delegatesSlice=createSlice({
    name:'delegatesSlice',
    initialState:{
        delegates:[]
    },
    reducers:{

        saveDelegates:(state,action)=>{
            state.delegates = action.payload
        },
        addDelegate:(state,action)=>{
            state.delegates = [...state.delegates,action.payload]
        }

    },
    extraReducers: builder => {

        builder.addCase(HYDRATE, (state, action) => {

            console.log("Before Hydration in delegatesSlice : " , action.payload)

            if(!action.payload.delegatesSlice.delegates){
                return state
            }
            state.delegates = action.payload.delegatesSlice.delegates;
            
        });

    }
})

export const { saveDelegates , addDelegate } = delegatesSlice.actions;
export const selectDelegates = state => state.delegatesSlice.delegates 
export default delegatesSlice.reducer;