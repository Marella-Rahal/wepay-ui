import { createSlice } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';

export const delegatesSlice=createSlice({
    name:'delegatesSlice',
    initialState:{
        delegates:[],
        filteredDelegates:[]
    },
    reducers:{

        saveDelegates:(state,action)=>{
            state.delegates = action.payload
        },
        addDelegate:(state,action)=>{
            state.delegates = [action.payload,...state.delegates]
        },
        filterByCity:(state,action)=>{
            state.filteredDelegates = state.delegates.filter( d => d.city==action.payload );
        },
        filterByName:(state,action)=>{
            state.filteredDelegates = state.delegates.filter( d => d.fullName.includes(action.payload) )
        },
        filterByCityAndName:(state,action)=>{
            state.filteredDelegates = state.delegates.filter( d => (d.city==action.payload.city) && (d.fullName.includes(action.payload.fullName) ) )
        }

    },
    extraReducers: builder => {

        builder.addCase(HYDRATE, (state, action) => {

            console.log("Before Hydration in delegatesSlice : " , action.payload)

            if( action.payload.delegatesSlice.delegates.length !== 0 ){
                state.delegates = action.payload.delegatesSlice.delegates;
            }   
            
        });

    }
})

export const { saveDelegates , addDelegate , filterByCity , filterByName , filterByCityAndName } = delegatesSlice.actions;
export const selectDelegates = state => state.delegatesSlice.delegates
export const selectFilteredDelegates = state => state.delegatesSlice.filteredDelegates
export default delegatesSlice.reducer;