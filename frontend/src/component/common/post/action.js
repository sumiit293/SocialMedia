import createPostApi from "./api";

export const POST_UPLOAD_START = "POST_UPLOAD_START";
export const POST_UPLOAD_SUCCESS = "POST_UPLOAD_SUCCESS";
export const POST_UPLOAD_ERROR = "POST_UPLOAD_ERROR";


export const createNewPost = (value, token) => async (dispatch) => {

    dispatch({ type: POST_UPLOAD_START })
    try {
        const res = await createPostApi(value, token);
        dispatch({ type: POST_UPLOAD_SUCCESS, post: res.data })
    } catch (error) {
        console.log(error);
        if (error.response && error.response.data) {
            dispatch({ type: POST_UPLOAD_ERROR, errMsg: error.response.data })
            return;
        }
        dispatch({ type: POST_UPLOAD_ERROR, errMsg: "Something went wrong could not upload your post !" })
        return;
    }
}