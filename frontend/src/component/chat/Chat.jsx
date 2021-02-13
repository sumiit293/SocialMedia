import React, { useEffect } from 'react';
import styled from 'styled-components';
import ChatBox from './sub_chat/ChatBox';
import FriendList from './sub_chat/FriendList';
import { connect } from 'react-redux';
import { fetchFriendList } from './action';
import socketClient from 'socket.io-client';
const SERVER = "http://127.0.0.1:5000";
const socket = socketClient(SERVER);
const socketForFriendList = socketClient(SERVER + "/active_or_not")

const ChatWrapper = styled.div`
  position: relative;
  margin: 50px auto;
  width: 100%;
  max-width: 800px;
  border: 1px solid teal;
  min-height: 200px;
`;

const LeftDiv = styled.div`
  position: absolute;
  top: 0px;
  width: 250px;
`;

const RightDiv = styled.div`
  margin-left: 250px;
  width: calc(100% - 250px);
  box-sizing: border-box;
  border: 1px solid grey;
`;

const Chat = (props) => {
  const { fetchFriendList, currentSelectedUser, chatState } = props;
  useEffect(() => {
    const token = localStorage.getItem("token");
    fetchFriendList(token);
    //eslint-disable-next-line
  }, [])

  return (
    <ChatWrapper>
      <LeftDiv>
        {<FriendList
          socket={socketForFriendList}
          chatState={chatState}
        />}
      </LeftDiv>
      <RightDiv>
        {<ChatBox
          currentUserState={currentSelectedUser}
          socket={socket}
        />}
      </RightDiv>
    </ChatWrapper>
  )
}
const mapStateToProps = (state) => ({
  currentSelectedUser: state.socketReducer,
  chatState: state.chatReducer
})

const mapDispatchToProps = (dispatch) => ({
  fetchFriendList: (value) => dispatch(fetchFriendList(value))
})
export default connect(mapStateToProps, mapDispatchToProps)(Chat);
