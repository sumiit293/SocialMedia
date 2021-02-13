import { fetchAllPOstApi } from './api';

export const FETCHING_POST = "FETCHING_POST";
export const FETCHING_POST_SUCCESS = "FETCHING_POST_SUCCESS";
export const FETCHING_POST_ERROR = "FETCHING_POST_ERROR";

export const fetchPosts = (token) => async (dispatch) => {
    dispatch({ type: FETCHING_POST });
    try {
        const res = await fetchAllPOstApi(token);
        console.log(res.data.posts)
        dispatch({ type: FETCHING_POST_SUCCESS, post: res.data.posts })
    } catch (error) {
        console.log(error);
        if (error.response && error.response.data) {
            dispatch({ type: FETCHING_POST_ERROR, errMsg: error.response.data });
            return;
        }
        dispatch({ type: FETCHING_POST_ERROR, errMsg: "Could not fetch post something went wrong !" });
    }
}