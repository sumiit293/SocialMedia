import { fetchProfileApi } from './api';

export const FETCH_SELF_PROFILE_START = "FETCH_SELF_PROFILE_START";
export const FETCH_SELF_PROFILE_SUCCESS = "FETCH_SELF_PROFILE_SUCCESS";
export const FETCH_SELF_PROFILE_ERROR = "FETCH_SELF_PROFILE_ERROR";

const fetchProfileStart = () => ({
    type: FETCH_SELF_PROFILE_START
});

const fetchProfileSuccess = (profile) => ({
    type: FETCH_SELF_PROFILE_SUCCESS,
    profile: profile
})

const fetchProfileError = (errMsg) => ({
    type: FETCH_SELF_PROFILE_ERROR,
    errMsg
});

export const fetchProfile = (value) => async (dispatch) => {
    dispatch(fetchProfileStart());
    try {
        const res = await fetchProfileApi(value);
        dispatch(fetchProfileSuccess(res.data));
    } catch (error) {
        console.log(error);
        if (error.response && error.response.error) {
            dispatch(fetchProfileError(error.response.error));
            return;
        }
        dispatch(fetchProfileError("Can't get profile data"));
    }
}