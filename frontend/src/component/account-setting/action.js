import { updateProfileAdditionalInfoApi } from './api'
import { toast } from 'react-toastify';

export const UPPDATE_INFO_START = "UPPDATE_INFO_START";
export const UPDATE_INFO_SUCCESS = "UPDATE_INFO_SUCCESS";
export const UPDATE_INFO_ERROR = "UPDATE_INFO_ERROR";

export const updateInfo = (value, token) => async (dispatch) => {
    dispatch({ type: UPPDATE_INFO_START })
    try {
        await updateProfileAdditionalInfoApi(value, token);
        dispatch({ type: UPDATE_INFO_SUCCESS })
        toast.success("Sucessfully updated")
    } catch (error) {
        console.log(error)
        if (error.response && error.respose.error) {
            dispatch({ type: UPDATE_INFO_ERROR, errMsg: error.respose.error })
            toast.error("Sorry something went wrong !");
            return;
        }
        dispatch({ type: UPDATE_INFO_ERROR, errMsg: null })
    }
}