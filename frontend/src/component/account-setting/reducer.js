import { UPDATE_INFO_ERROR, UPDATE_INFO_SUCCESS, UPPDATE_INFO_START } from './action';

const initialState = {
    updating: false,
    errMsg: null,
}

const additionalInfoReducer = (state = initialState, action) => {
    switch (action.type) {
        case UPPDATE_INFO_START: {
            return {
                ...state,
                updating: true
            }
        }
        case UPDATE_INFO_SUCCESS: {
            return {
                ...state,
                updating: false,
                errMsg: null
            }
        }
        case UPDATE_INFO_ERROR: {
            return {
                ...state,
                updating: false,
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

export default additionalInfoReducer