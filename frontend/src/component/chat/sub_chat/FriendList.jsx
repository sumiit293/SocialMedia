import React, { useEffect, useState } from 'react';
import { fetchIndividualInfoForChat } from './../api';
import { setCurrentSelectedRoom } from './action';
import styled from 'styled-components';
import { connect } from 'react-redux';

const Wrapper = styled.div`
  width: 100%;
  padding: 0px;
  margin: 0px;
`;

const FriendMenu = styled.div`
  display: flex;
  position: relative;
  justify-content: left;
  align-items: center;
  margin: 0px;
  border-bottom: 1px solid grey;
  padding: 5px;
  cursor: pointer;
  &: hover{
      background: lightgrey;
  }
`;

const ProfilePic = styled.div`
  width: 30px;
  min-width: 30px;
  height: 30px;
  min-height: 30px;
  border-radius: 50%;
  border: 1px solid teal;
  background: teal;
  position:relative;
`;

const OnlineIndicator = styled.div`
 position: absolute;
 width: 10px;
 height: 10px;
 border-radius: 50%;
 background: ${props => !!props.active && props.active ? 'lightgreen' : 'grey'};
 left: 80%;
 top: 30%;
`;

const UnreadMsgCounter = styled.div`
 position: absolute;
 display: flex;
 align-item: center;
 justify-content: center;
 border-radius: 50%;
 background: teal;
 color: white;
 left: 85%;
 top: 50%;
 font: 14px;
 padding: 5px;
 transform: translateY(-50%);
`;


const Name = styled.div`
  font-weight: 600;
  font-size: 17px;
  color: teal;
  cursor: pointer;
  margin-left: 20px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;
const ChatMenu = (props) => {

    const [name, setName] = useState(null);
    const [profilePic, setProfilePic] = useState(null);
    const [currentActive, setCurrentActive] = useState(false);
    const [unreadMsg, setUnreadMsg] = useState(0);
    var change = 6;

    async function fetchInfo(id) {
        const token = localStorage.getItem("token");
        const res = await fetchIndividualInfoForChat(id, token);
        const { name, profilePic } = res.data;
        setName(name);
        setProfilePic(profilePic);
    }

    const { id, socket, handleClick, roomState, index } = props;

    useEffect(() => {
        fetchInfo(props.id.friend_id);
        window.addEventListener("beforeunload", () => {
            socket.emit("leave_room", { room_id: id.message_id });
        })
        return () => {
            window.removeEventListener("beforeunload", () => { })
        }
        //eslint-disable-next-line 
    }, [])

    useEffect(() => {
        if (socket.connected) {
            //all emiting events
            socket.emit("join_room", { room_id: id.message_id, self_id: id._id });
            //all listining events
            socket.on(id.message_id + "set_active", () => {
                setCurrentActive(true);
            })
            socket.on(id.message_id + "set_inactive", () => {
                setCurrentActive(false)
            })

        } else {
            socket.emit("leave_room", { room_id: id.message_id });
        }
        return () => {
            socket.emit("leave_room", { room_id: id.message_id });
        }
        //eslint-disable-next-line
    }, [socket.connected, id.message_id])

    useEffect(() => {
        socket.on(id.message_id + "increase_msg_counter", () => {
            console.log(id.message_id, roomState.room, id.message_id !== roomState.room, index)
            if (id.message_id !== roomState.room && roomState.room !== null) {
                setUnreadMsg(unreadMsg + 1);
            }
        })
    }, [roomState.room, unreadMsg])
    const handleClickOnFriendMenu = () => {
        handleClick(name, profilePic, id.message_id);
        setUnreadMsg(0);
    }
    return (
        <FriendMenu onClick={handleClickOnFriendMenu}>
            <ProfilePic>
                <OnlineIndicator active={currentActive} />
            </ProfilePic>
            <Name>
                {name}
            </Name>
            {unreadMsg !== 0 && <UnreadMsgCounter> +{change}</UnreadMsgCounter>}
        </FriendMenu>
    )
}

const FriendList = (props) => {
    const { chatState: { friends }, setCurrentRoom, socket, roomState } = props;

    return (
        <Wrapper>
            {friends.map((value, index) => <ChatMenu
                id={value}
                key={index}
                index={index}
                handleClick={setCurrentRoom}
                socket={socket}
                roomState={roomState}
            />)}
        </Wrapper>
    )
}
const mapStateToProps = (state) => ({
    roomState: state.socketReducer
})

const mapDispatchToPrps = (dispatch) => ({
    setCurrentRoom: (name, profilePic, room) => dispatch(setCurrentSelectedRoom(name, profilePic, room))
})

export default connect(mapStateToProps, mapDispatchToPrps)(FriendList)
