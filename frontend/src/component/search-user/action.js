import { searchUserApi } from './api'
export const SEARCH_USER_START = "SEARCH_USER_START";
export const SEARCH_USER_SUCCESS = "SEARCH_USER_SUCCESS";
export const SEARCH_USER_ERROR = "SEARCH_USER_ERROR";
export const SHOW_DROP_DOWN = "SHOW_DROP_DOWN";
export const HIDE_DROP_DOWN = "HIDE_DROP_DOWN";
export const SET_CURRENT_PAGE_TO_SEARCH_PAGE = "SET_CURRENT_PAGE_TO_SEARCH_PAGE";
export const SET_CURRENT_PAGE_TO_NOT_SEARCH_PAGE = "SET_CURRENT_PAGE_TO_NOT_SEARCH_PAGE";

export const showDD = () => ({
    type: SHOW_DROP_DOWN
})

export const hideDD = () => ({
    type: HIDE_DROP_DOWN
})

export const setCurrentSearchPage = () => ({
    type: SET_CURRENT_PAGE_TO_SEARCH_PAGE
})

export const removeCurrentSearchPage = () => ({
    type: SET_CURRENT_PAGE_TO_NOT_SEARCH_PAGE
})

export const searchUser = (value) => async (dispatch) => {
    dispatch({ type: SEARCH_USER_START });
    try {
        const res = await searchUserApi(value);
        console.log(res.data.hits.hits)
        dispatch({ type: SEARCH_USER_SUCCESS, users: res.data.hits.hits })
    } catch (error) {
        console.log(error);
        if (error.response && error.response.data) {
            dispatch({ type: SEARCH_USER_ERROR, errorMsg: error.response.data })
            return
        }
        dispatch({ type: SEARCH_USER_ERROR, errorMsg: "Something went wrong" })
    }
}