// src/store/index.ts


import {configureStore} from "@reduxjs/toolkit";
import { rootReducer } from './rootReducer';

export const store = configureStore({
    reducer: rootReducer,
});
