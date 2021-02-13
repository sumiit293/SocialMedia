import {
    SEARCH_USER_ERROR,
    SEARCH_USER_START,
    SEARCH_USER_SUCCESS,
    SHOW_DROP_DOWN,
    HIDE_DROP_DOWN,
    SET_CURRENT_PAGE_TO_NOT_SEARCH_PAGE,
    SET_CURRENT_PAGE_TO_SEARCH_PAGE
} from './action';

const initialState = {
    search_result: [],
    err_msg: null,
    searching: false,
    show_dd: true,
    current_page_search: false
}

const searchUserReducer = (state = initialState, action) => {
    switch (action.type) {
        case SEARCH_USER_START: {
            return {
                ...state,
                searching: true
            }
        }
        case SEARCH_USER_SUCCESS: {
            return {
                ...state,
                search_result: action.users,
                searching: false
            }
        }
        case SEARCH_USER_ERROR: {
            return {
                ...state,
                search_result: [],
                searching: false
            }
        }
        case HIDE_DROP_DOWN: {
            return {
                ...state,
                show_dd: false
            }
        }
        case SHOW_DROP_DOWN: {
            return {
                ...state,
                show_dd: true
            }
        }
        case SET_CURRENT_PAGE_TO_NOT_SEARCH_PAGE: {
            return {
                ...state,
                current_page_search: false
            }
        }
        case SET_CURRENT_PAGE_TO_SEARCH_PAGE: {
            return {
                ...state,
                current_page_search: true
            }
        }
        default: {
            return {
                ...state
            }
        }
    }
}
export default searchUserReducer;