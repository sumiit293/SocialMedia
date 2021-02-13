import { combineReducers } from 'redux';
import { reducer as formReducer } from "redux-form";
import loginReducer from './component/login/reducer';
import profileReducer from './component/profile/reducer';
import profileUpdateReducer from './component/account-setting/reducer';
import searchUserReducer from './component/search-user/reducer';
import chatReducer from './component/chat/reducer';
import socketReducer from './component/chat/sub_chat/reducer';
import createPostReducer from './component/common/post/reducer';
import homePageReducer from './component/home/reducer';

const reducer = {
    form: formReducer,
    loginReducer,
    profileReducer,
    profileUpdateReducer,
    searchUserReducer,
    chatReducer,
    socketReducer,
    createPostReducer,
    homePageReducer,
};
export const rootReducer = combineReducers(reducer);