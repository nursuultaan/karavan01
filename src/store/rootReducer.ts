// src/store/rootReducer.ts
import { combineReducers } from 'redux';
import filterReducer from "./filterReducer.ts"

export const rootReducer = combineReducers({
    filter: filterReducer,
});
