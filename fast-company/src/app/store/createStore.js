import { combineReducers, configureStore } from "@reduxjs/toolkit";
import qualitiesReducer from "./qualities";
import professionsReducer from "./professions";
import usersReducer from "./users";
import commentsReducer from "./comments";

const rootReducer = combineReducers({
    users: usersReducer,
    qualities: qualitiesReducer,
    professions: professionsReducer,
    comments: commentsReducer
});

export function createStore() {
    return configureStore({
        reducer: rootReducer
        // middleware: (getDefaultMiddleware) =>
        //     getDefaultMiddleware().concat(logger),
        // devTools: process.env.NODE_ENV !== "production",
    });
};
