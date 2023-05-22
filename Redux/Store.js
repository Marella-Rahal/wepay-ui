import { configureStore } from '@reduxjs/toolkit';
import { createWrapper } from 'next-redux-wrapper';
import userSlice from './Slices/userSlice';
import delegatesSlice from './Slices/delegatesSlice';

const makeStore = () => 
    configureStore({
        reducer:{
            userSlice : userSlice,
            delegatesSlice : delegatesSlice,
        }
    })

export const wrapper=createWrapper(makeStore)