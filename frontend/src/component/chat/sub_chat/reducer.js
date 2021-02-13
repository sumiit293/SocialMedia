import { CHANGE_CURRENT_SELECTED_ROOM } from './action';

const initialState = {
    name: null,
    room: null,
    profilePic: null
}

const socketReducer = (state = initialState, action) => {

    switch (action.type) {
        case CHANGE_CURRENT_SELECTED_ROOM: {
            return {
                ...state,
                room: action.room,
                name: action.name,
                profilePic: action.profilePic
            }
        }
        default: {
            return {
                ...state
            }
        }
    }

}

export default socketReducer;