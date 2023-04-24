import { combineReducers, configureStore } from "@reduxjs/toolkit";
import qualitiesReducer from "./qualities";

const rootReducer = combineReducers({
    qualities: qualitiesReducer
});

export function createStore() {
    return configureStore({
        reducer: rootReducer
        // middleware: (getDefaultMiddleware) =>
        //     getDefaultMiddleware().concat(logger),
        // devTools: process.env.NODE_ENV !== "production",
    });
};
