import { fetchFriendListApi } from './api';
export const FRIEND_LIST_FETCH_START = "FRIEND_LIST_FETCH_START";
export const FRIEND_LIST_FETCH_SUCCESS = "FRIEND_LIST_FETCH_SUCCESS";
export const FRIEND_LIST_FETCH_ERROR = "FRIEND_LIST_FETCH_ERROR";


export const fetchFriendList = (token) => async (dispatch) => {
    dispatch({ type: FRIEND_LIST_FETCH_START });
    try {
        const res = await fetchFriendListApi(token);
        dispatch({ type: FRIEND_LIST_FETCH_SUCCESS, friends: res.data.friends.friendList })
        console.log(res.data);
    } catch (error) {
        console.log(error);
        if (error.response && error.response.data) {
            dispatch({
                type: FRIEND_LIST_FETCH_ERROR,
                error: error.response.data
            })
            return;
        }
        dispatch({
            type: FRIEND_LIST_FETCH_ERROR,
            error: "Could not get FriendList"
        })
    }
}