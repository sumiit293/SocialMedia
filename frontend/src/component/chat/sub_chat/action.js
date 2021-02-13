
export const CHANGE_CURRENT_SELECTED_ROOM = "CHANGE_CURRENT_SELECTED_ROOM";


export const setCurrentSelectedRoom = (name, profilePic, room_id) => (dispatch) => {
    dispatch({ type: CHANGE_CURRENT_SELECTED_ROOM, name: name, profilePic: profilePic, room: room_id })
}

