import { configureStore } from '@reduxjs/toolkit';
import { createWrapper } from 'next-redux-wrapper';

const store=configureStore({
    reducer:{

    }
})

export const wrapper=createWrapper(()=>store)