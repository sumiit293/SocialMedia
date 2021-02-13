import React, { useRef, useEffect } from 'react';
import styled from 'styled-components';
import Button from '../../common/button/Button';
import { connect } from 'react-redux';

const ChatWrapper = styled.div`
  width: 100%;
`;

const MidSection = styled.div`
  min-height: 250px;
  max-height: 250px;
  overflow-Y: scroll;
`;

const MsgWrapper = styled.div`
  display: flex;
  margin: 0px;
  padding: 0px;
  width: 100%;
  &.right{
    justify-content: flex-end;
  }
`;

const MsgPara = styled.p`
  margin: 5px 5px;
  padding: 10px;
  font-size: 15px;
  max-width: 60%;
  box-shadow: 0px 0px 1px 1px grey;
  border-radius: 10px;
`;

const LowerSection = styled.div`
  display: flex;
  align-item: center;
`;

const SendButton = styled.div`
  width: 80px;
  padding: 0px;
  margin: 0px;
  &.small-font {
      font-size: 14px;
      font-weight: 600;
      text-transform: capitalize;
      background: teal;
  }
`;

const InputField = styled.input.attrs({ placeholder: "Send msg..." })`
  width: calc(100% - 80px);
  font-family: sans-serif;
  font-size: 15px;
  height: 32px;
  outline: none;
`;

const Header = styled.div`
  display: flex;
  justify-content: left;
  align-items: center;
  margin: 0px 0px;
  border-radius: 0px;
  padding: 10px;
  background: teal;
`;

const ProfilePic = styled.div`
  width: 40px;
  min-width: 40px;
  height: 40px;
  min-height: 40px;
  border-radius: 50%;
  border: 1px solid teal;
  background: white;
`;

const Name = styled.div`
  font-weight: 600;
  font-size: 17px;
  color: white;
  cursor: pointer;
  margin-left: 20px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;



const ChatBox = (props) => {
  //ref for msunupulating the chat box element
  const msgBox = useRef();
  const inputField = useRef();
  const { currentUserStateself, socket } = props;

  //handle click
  const handleClick = (id) => {
    var inputBox = inputField.current;
    if (inputBox.value) {
      const msg = {
        content: inputBox.value,
        room_id: id
      }
      if (id) {
        socket.emit("chat-msg", msg);
        msgBox.current.append(generateRightChild(inputBox.value));
        msgBox.current.scrollTop = msgBox.current.scrollHeight;
        inputBox.value = "";
      }
    }
  }

  // function for creating and apending the div
  function generateRightChild(value = null) {
    const primaryWrapper = document.createElement("div");
    const childElem = document.createElement("p");
    primaryWrapper.classList.add(["parent"])
    primaryWrapper.classList.add(['right'])
    childElem.classList.add(["child"])
    childElem.innerText = value;
    primaryWrapper.appendChild(childElem)
    return primaryWrapper;
  }

  function generateLeftChild(value = null) {
    const primaryWrapper = document.createElement("div");
    const childElem = document.createElement("p");
    primaryWrapper.classList.add(["parent"])
    childElem.classList.add(["child"])
    childElem.innerText = value;
    primaryWrapper.appendChild(childElem)
    return primaryWrapper;
  }



  useEffect(() => {
    socket.on("incoming_chat_msg", (value) => {
      if (msgBox.current) {
        msgBox.current.append(generateLeftChild(value));
        msgBox.current.scrollTop = msgBox.current.scrollHeight;
      }
    })
    //eslint-disable-next-line
  }, [])

  useEffect(() => {
    if (currentUserStateself.room) {
      socket.emit("join_room", currentUserStateself.room);
    }
    return () => {
      socket.emit("leave_room", currentUserStateself.room);
    }
  }, [currentUserStateself.room, socket])

  return (
    <ChatWrapper>
      <Header>
        <ProfilePic>

        </ProfilePic>
        <Name>
          {currentUserStateself.name}
        </Name>
      </Header>
      <MidSection ref={msgBox}>
        <MsgWrapper>
          <MsgPara> Hey there , how are you ? </MsgPara>
        </MsgWrapper>
        <MsgWrapper className="right">
          <MsgPara> Fine , and you ? </MsgPara>
        </MsgWrapper>
      </MidSection>
      <LowerSection>
        <InputField ref={inputField} />
        <SendButton>
          <Button label="Send" className=" primary small-font" onClick={() => handleClick(currentUserStateself.room)} />
        </SendButton>
      </LowerSection>
    </ChatWrapper>
  )
}
const mapStateToProps = (state) => ({
  currentUserStateself: state.socketReducer
})
export default connect(mapStateToProps, null)(ChatBox)
