import { POST_UPLOAD_ERROR, POST_UPLOAD_START, POST_UPLOAD_SUCCESS } from './action';

const initilState = {
    uploading: false,
    uploadSuccess: false,
    errorMsg: null
}

const createPostReducer = (state = initilState, action) => {
    switch (action.types) {

        case POST_UPLOAD_START: {
            return {
                ...state,
                uploading: true,
                errorMsg: null,
                uploadSuccess: false
            }
        }
        case POST_UPLOAD_SUCCESS: {
            return {
                ...state,
                uploading: false,
                errorMsg: null,
                uploadSuccess: true
            }
        }
        case POST_UPLOAD_ERROR: {
            return {
                ...state,
                uploadSuccess: false,
                uploading: false,
                errorMsg: action.errMsg
            }
        }
        default: {
            return {
                ...state
            }
        }
    }

}
export default createPostReducer;