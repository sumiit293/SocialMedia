import { FETCH_SELF_PROFILE_ERROR, FETCH_SELF_PROFILE_SUCCESS, FETCH_SELF_PROFILE_START } from './action';

const initialState = {
    profile: null,
    errMsg: null,
    fetchingProfileInProgress: false
}

const ProfileReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_SELF_PROFILE_START: {
            return {
                ...state,
                fetchingProfileInProgress: true
            }
        }
        case FETCH_SELF_PROFILE_SUCCESS: {
            return {
                ...state,
                profile: action.profile,
                fetchingProfileInProgress: false
            }
        }
        case FETCH_SELF_PROFILE_ERROR: {
            return {
                ...state,
                errMsg: action.errMsg,
                fetchingProfileInProgress: false
            }
        }
        default: {
            return {
                ...state
            }
        }
    }
}
export default ProfileReducer;