import { createAction, createSlice } from "@reduxjs/toolkit";
import userService from "../services/user.service";
import authService from "../services/auth.service";
import localStorageService from "../services/localStorage.service";
import randomInt from "../utils/randomInt";
import customHistory from "../utils/history";

const initialState = localStorageService.getAccessToken()
    ? {
        entities: null,
        isLoading: true,
        error: null,
        auth: { userId: localStorageService.getUserId() },
        isLoggedIn: true,
        dataLoaded: false
    }
    : {
        entities: null,
        isLoading: false,
        error: null,
        auth: null,
        isLoggedIn: false,
        dataLoaded: false
    };
const usersSlice = createSlice({
    name: "users",
    initialState: initialState,
    reducers: {
        usersRequested: (state) => {
            state.isLoading = true;
        },
        usersReceived: (state, action) => {
            state.entities = action.payload;
            state.dataLoaded = true;
            state.isLoading = false;
            // state.isLoggedIn = true;
        },
        usersRequestFailed: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        },
        // authRequested зададим через createAction("users/authRequested")
        authRequestedSuccess: (state, action) => {
            state.auth = action.payload;
            state.isLoggedIn = true;
            // state.dataLoaded = true;
        },
        authRequestedFailed: (state, action) => {
            state.error = action.payload.error;
        },
        // userCreateRequested зададим через createAction("users/userCreateRequested")
        userCreated: (state, action) => {
            if (!Array.isArray(state.entities)) {
                state.entities = [];
            }
            state.entities.push(action.payload);
        },
        // userCreatedFailed зададим через createAction("users/userCreatedFailed")
        // userEditedRequested зададим через createAction("users/userEditedRequested")
        userEdited: (state, action) => {
            if (!Array.isArray(state.entities)) {
                state.entities = [];
            }
            state.entities.map(user => user._id !== state.auth.userId
                ? user
                : action.payload
            );
        },
        // userEditedFailed зададим через createAction("users/userEditedFailed")
        userLoggedOut: (state, action) => {
            state.entities = null;
            state.isLoggedIn = false;
            state.auth = null;
            state.dataLoaded = false;
        }
    }
});

const { reducer: usersReducer, actions } = usersSlice;
const {
    usersRequested,
    usersReceived,
    usersRequestFailed,
    authRequestedSuccess,
    authRequestedFailed,
    userCreated,
    userLoggedOut,
    userEdited
} = actions;

const authRequested = createAction("users/authRequested");
const userCreateRequested = createAction("users/userCreateRequested");
const userCreatedFailed = createAction("users/userCreatedFailed");
const userEditedRequested = createAction("users/userEditedRequested");
const userEditedFailed = createAction("users/userEditedFailed");

export const login = ({ payload, redirect }) => async (dispatch) => {
    const { email, password } = payload;
    dispatch(authRequested());
    try {
        const data = await authService.login({ email, password });
        dispatch(authRequestedSuccess({ userId: data.localId }));
        localStorageService.setTokens(data);
        customHistory.push(redirect);
    } catch (error) {
        dispatch(authRequestedFailed(error.message));
    }
};

export const logout = () => (dispatch) => {
    localStorageService.removeAuthData();
    dispatch(userLoggedOut());
    customHistory.push("/");
};

// Функция создания юзера. Диспатчится после успешной авторизации. Т.е. вызывается в "signUp" после dispatch(authRequestedSuccess())
const createUser = (payload) => async (dispatch, getState) => {
    dispatch(userCreateRequested());
    try {
        const { content } = await userService.create(payload);
        dispatch(userCreated(content)); // setUser(content);
        customHistory.push("users/");
    } catch (error) {
        dispatch(userCreatedFailed(error.message));
    }
};

export const editUserInfo = (payload) => async (dispatch, getState) => {
    dispatch(userEditedRequested());
    try {
        const { content } = await userService.update(payload);
        dispatch(userEdited(content)); // content === action.payload
        customHistory.push("/");
    } catch (error) {
        dispatch(userEditedFailed(error.message));
    }
};

export const signUp = ({ email, password, ...rest }) => async (dispatch, getState) => {
    dispatch(authRequested());
    try {
        const data = await authService.register({ email, password });
        localStorageService.setTokens(data);
        dispatch(authRequestedSuccess({ userId: data.localId }));
        dispatch(createUser({
            _id: data.localId,
            email,
            rate: randomInt(1, 5),
            completedMeetings: randomInt(0, 200),
            image: `https://avatars.dicebear.com/api/avataaars/${(
                Math.random() + 1
            )
                .toString(36)
                .substring(7)}.svg`,
            ...rest
        }));
    } catch (error) {
        dispatch(authRequestedFailed(error.message));
    }
};

export const loadUsersList = () => async (dispatch, getState) => {
    dispatch(usersRequested());
    try {
        const { content } = await userService.get();
        dispatch(usersReceived(content));
    } catch (error) {
        dispatch(usersRequestFailed(error.message));
    }
};

export const getUsersList = () => (state) => state.users.entities;
export const getUserById = (userId) => (state) => {
    if (state.users.entities) {
        return state.users.entities.find(user => user._id === userId);
    }
};
export const getIsLoggedIn = () => (state) => state.users.isLoggedIn;
export const getDataStatus = () => (state) => state.users.dataLoaded;
export const getUsersLoadingStatus = () => (state) => state.users.isLoading;
export const getCurrentUserId = () => (state) => state.users.auth.userId;
export const getCurrentUserData = () => (state) => {
    return state.users.entities
        ? state.users.entities.find((user) => user._id === state.users.auth.userId)
        : null;
    // if (state.users.entities) {
    //     state.users.entities.find((user) => user._id === state.users.auth.userId);
    // } else if (state.users.entities === null) {
    //     return null;
    // }
};

export default usersReducer;
