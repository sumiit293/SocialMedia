import { FETCHING_POST_ERROR, FETCHING_POST_SUCCESS, FETCHING_POST } from './action';

export const initialState = {
    fetchingInProgress: false,
    post: [],
    errMsg: null

}

const homePageReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCHING_POST: {
            return {
                ...state,
                fetchingInProgress: true
            }
        }
        case FETCHING_POST_SUCCESS: {
            return {
                ...state,
                fetchingInProgress: false,
                post: action.post
            }
        }
        case FETCHING_POST_ERROR: {
            return {
                ...state,
                errMsg: action.errMsg
            }
        }
        default: {
            return {
                ...state
            }
        }
    }
}
export default homePageReducer;