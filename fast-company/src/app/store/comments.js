import { createAction, createSlice } from "@reduxjs/toolkit";
import commentService from "../services/comment.service";

const commentsSlice = createSlice({
    name: "comments",
    initialState: {
        entities: null,
        isLoaded: true,
        error: null
    },
    reducers: {
        commentsRequested: (state) => {
            state.isLoading = true;
        },
        commentsReceived: (state, action) => {
            state.entities = action.payload;
            state.isLoading = false;
        },
        commentsRequestFailed: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        },
        commentCreateSuccessed: (state, action) => {
            if (!Array.isArray(state.entities)) {
                state.entities = [];
            }
            state.entities[
                state.entities.findIndex((comment) => comment._id === action.payload._id)
            ] = action.payload;
        },
        commentRemoveSuccessed: (state, action) => {
            state.entities.filter(comment => comment._id !== action.payload);
        }
    }
});

const commentCreateRequest = createAction("comments/commentCreateRequest");
const commentCreateFailed = createAction("comments/commentCreateFailed");
const commentRemoveRequest = createAction("comments/commentRemoveRequest");
const commentRemoveFailed = createAction("comments/commentRemoveFailed");

const { reducer: commentsReducer, actions } = commentsSlice;
const {
    commentsRequested,
    commentsReceived,
    commentsRequestFailed,
    commentCreateSuccessed,
    commentRemoveSuccessed
} = actions;

export const loadCommentsList = (userId) => async (dispatch, getState) => {
    dispatch(commentsRequested());
    try {
        const { content } = await commentService.getComments(userId);
        dispatch(commentsReceived(content));
    } catch (error) {
        dispatch(commentsRequestFailed(error.message));
    }
};

export const createComment = (payload) => async (dispatch) => {
    dispatch(commentCreateRequest());
    try {
        const { content } = await commentService.createComment(payload);
        dispatch(commentCreateSuccessed(content));
    } catch (error) {
        dispatch(commentCreateFailed(error.message));
    }
};

export const removeComment = (commentId) => async (dispatch, getState) => {
    dispatch(commentRemoveRequest());
    try {
        const { content } = await commentService.removeComment(commentId);
        if (content === null) {
            dispatch(commentRemoveSuccessed(commentId));
        }
    } catch (error) {
        dispatch(commentRemoveFailed(error.message));
    }
};

export const getComments = () => (state) => state.comments.entities;
export const getCommentsLoadStatus = () => (state) => state.comments.isLoading;
export const getCommentsById = (id) => (state) => state.comments.entities.find((p) => p._id === id);

export default commentsReducer;
