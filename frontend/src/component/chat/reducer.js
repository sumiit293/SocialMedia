import { FRIEND_LIST_FETCH_ERROR, FRIEND_LIST_FETCH_SUCCESS, FRIEND_LIST_FETCH_START } from './action';

const initialState = {
    friends: [],
    error: null,
    fetchingFriendList: false
}

const chatReducer = (state = initialState, action) => {
    switch (action.type) {
        case FRIEND_LIST_FETCH_START: {
            return {
                ...state,
                fetchingFriendList: true
            }
        }
        case FRIEND_LIST_FETCH_SUCCESS: {
            return {
                ...state,
                friends: action.friends,
                fetchingFriendList: false
            }
        }
        case FRIEND_LIST_FETCH_ERROR: {
            return {
                ...state,
                friends: [],
                error: action.error,
                fetchingFriendList: false
            }
        }
        default: {
            return {
                ...state
            }
        }
    }
}

export default chatReducer;