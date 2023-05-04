import { configureStore } from '@reduxjs/toolkit';
import { createWrapper } from 'next-redux-wrapper';
import userSlice from './Slices/userSlice';

const makeStore = () => 
    configureStore({
        reducer:{
            [userSlice.name]:userSlice,
        }
    })

export const wrapper=createWrapper(makeStore)